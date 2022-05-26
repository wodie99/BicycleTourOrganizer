package net.wodie.backend.service;

import net.wodie.backend.model.BtoItem;
import net.wodie.backend.repository.BtoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BtoService {
    private final BtoRepository btoRepository;

    public BtoService(BtoRepository btoRepository) {
        this.btoRepository = btoRepository;
    }

    public List<BtoItem> getAllBtoItems() {
        return btoRepository.findAll();

    }

    public BtoItem updateBtoItem(BtoItem updatedBtoItem) {
        return btoRepository.save(updatedBtoItem);
    }
}
