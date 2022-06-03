package net.wodie.backend.service;

import net.wodie.backend.model.BtoItem;
import net.wodie.backend.repository.BtoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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
        return btoRepository.save(updatedBtoItem);
    }

    public String getBtoItemStatusById(String id) {
        return btoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException(BTO_ITEM_NOT_FOUND + id))
                .getStatus();
    }

    @SuppressWarnings("java:S3776")
    public BtoItem updateBtoVote(String id, String username, String vote) {
        Optional<BtoItem> btoItem = btoRepository.findById(id);
        if (btoItem.isEmpty()) {
            throw new NoSuchElementException(BTO_ITEM_NOT_FOUND + id);
        } else {
            BtoItem btoTemp = btoItem.get();
            if (btoTemp.getStatus().equals("VOTE")) {
                if (vote.equals("MEMBER")) {
                    if (btoTemp.getActionMembers().contains(username)) {
                        btoTemp.getActionMembers().add(username);
                    }
                    if (btoTemp.getActionNotMembers().contains(username)) {
                        btoTemp.getActionNotMembers().remove(username);
                    }
                } else {
                    if (btoTemp.getActionNotMembers().contains(username)) {
                        btoTemp.getActionNotMembers().add(username);
                    }
                    if (btoTemp.getActionMembers().contains(username)) {
                        btoTemp.getActionMembers().remove(username);
                    }
                }
                btoRepository.save(btoTemp);
            }
        }
        return btoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException(BTO_ITEM_NOT_FOUND + id));
    }
}
