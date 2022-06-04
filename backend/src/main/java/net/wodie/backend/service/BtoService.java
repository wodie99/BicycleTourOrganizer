package net.wodie.backend.service;

import net.wodie.backend.dto.BtoVote;
import net.wodie.backend.model.BtoItem;
import net.wodie.backend.repository.BtoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
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
    public BtoItem updateBtoVote(String id, BtoVote btoVote) {
        Optional<BtoItem> btoItem = btoRepository.findById(id);
        if (btoItem.isEmpty()) {
            throw new NoSuchElementException(BTO_ITEM_NOT_FOUND + id);
        } else {
            BtoItem btoTemp = btoItem.get();
            if (btoTemp.getStatus().equals("VOTE")) {
                if (btoVote.getVote().equals("YES")) {
                    if (!btoTemp.getActionMembers().contains(btoVote.getUsername())) {
                        btoTemp.getActionMembers().add(btoVote.getUsername());
                    }
                    if (btoTemp.getActionNotMembers().contains(btoVote.getUsername())) {
                        btoTemp.getActionNotMembers().remove(btoVote.getUsername());
                    }
                } else {
                    if (!btoTemp.getActionNotMembers().contains(btoVote.getUsername())) {
                        btoTemp.getActionNotMembers().add(btoVote.getUsername());
                    }
                    if (btoTemp.getActionMembers().contains(btoVote.getUsername())) {
                        btoTemp.getActionMembers().remove(btoVote.getUsername());
                    }
                }
                return btoRepository.save(btoTemp);
            }
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong status");
        }
    }

    public BtoItem easyPut(String id, BtoVote btoVote) {
        Optional<BtoItem> btoItem = btoRepository.findById(id);
        if (btoItem.isPresent()) {
            BtoItem btoTemp = btoItem.get();
            btoTemp.setTitle1(btoVote.getUsername());
            btoTemp.setTitle2(btoVote.getVote());
            return btoRepository.save(btoTemp);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong status");
    }
}

