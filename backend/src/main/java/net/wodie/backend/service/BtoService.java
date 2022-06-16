package net.wodie.backend.service;

import net.wodie.backend.dto.BtoVote;
import net.wodie.backend.model.BtoItem;
import net.wodie.backend.repository.BtoRepository;
import org.springframework.stereotype.Service;
import java.util.*;


@Service
public class BtoService {
    private final BtoRepository btoRepository;
    private static final String BTO_ITEM_NOT_FOUND = "BtoItem not found with id: ";

    public BtoService(BtoRepository btoRepository) {
        this.btoRepository = btoRepository;
    }

    public List<BtoItem> getAllBtoItems() {
        return btoRepository.findAll();
    }

    public BtoItem updateBtoItem(BtoItem updatedBtoItem) {
        if (updatedBtoItem.getStatus().equals("NEW")) {
            updatedBtoItem.setActionOwner("");
            clearVoteFields(updatedBtoItem);
        }
        if (updatedBtoItem.getStatus().equals("PREP4VOTE")) {
            clearVoteFields(updatedBtoItem);
        }
        return btoRepository.save(updatedBtoItem);
    }

    public String getBtoItemStatusById(String id) {
        return btoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException(BTO_ITEM_NOT_FOUND + id))
                .getStatus();
    }

    private void clearVoteFields(BtoItem btoItem) {
            btoItem.setActionMembers(Collections.emptyList());
            btoItem.setActionNotMembers(Collections.emptyList());
    }

    @SuppressWarnings("java:S3776")
    public BtoItem updateBtoVote(String id, BtoVote btoVote) {
        Optional<BtoItem> btoItem = btoRepository.findById(id);
        if (btoItem.isEmpty()) {
            throw new NoSuchElementException(BTO_ITEM_NOT_FOUND + id);
        } else {
            BtoItem btoTemp = btoItem.get();
            if (btoTemp.getStatus().equals("VOTE")) {
                if (btoVote.getVote().equals("YES")) {
                    if (!btoTemp.getActionMembers().contains(btoVote.getUsername())) {
                        List<String> tempList = new ArrayList<>(btoTemp.getActionMembers());
                        tempList.add(btoVote.getUsername());
                        btoTemp.setActionMembers(tempList);
                    }
                    if (btoTemp.getActionNotMembers().contains(btoVote.getUsername())) {
                        List<String> tempList = new ArrayList<>(btoTemp.getActionNotMembers());
                        tempList.remove(btoVote.getUsername());
                        btoTemp.setActionNotMembers(tempList);
                    }
                } else {
                    if (!btoTemp.getActionNotMembers().contains(btoVote.getUsername())) {
                        List<String> tempList = new ArrayList<>(btoTemp.getActionNotMembers());
                        tempList.add(btoVote.getUsername());
                        btoTemp.setActionNotMembers(tempList);
                    }
                    if (btoTemp.getActionMembers().contains(btoVote.getUsername())) {
                        List<String> tempList = new ArrayList<>(btoTemp.getActionMembers());
                        tempList.remove(btoVote.getUsername());
                        btoTemp.setActionMembers(tempList);
                    }
                }
                return btoRepository.save(btoTemp);
            }
            throw new IllegalStateException("Actual Status of BtoItem: " + btoTemp.getStatus());
        }
    }
}

