package net.wodie.backend.service;

import net.wodie.backend.dto.BtoDisplayItem;
import net.wodie.backend.repository.BtoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BtoService {
    private final BtoRepository btoRepository;

    public BtoService(BtoRepository btoRepository) {
        this.btoRepository = btoRepository;
    }

    public List<BtoDisplayItem> getBtoDisplayItems() {
        return btoRepository.findAll();

    }
}
