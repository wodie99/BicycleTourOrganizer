package net.wodie.backend.controller;

import net.wodie.backend.model.BtoItem;
import net.wodie.backend.service.BtoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/btoItem")
public class BtoController {

    private final BtoService btoService;

    public BtoController(BtoService btoService) {
        this.btoService = btoService;
    }

    @GetMapping()
    public List<BtoItem> getAllBtoItems() {
        return btoService.getAllBtoItems();
    }
}
