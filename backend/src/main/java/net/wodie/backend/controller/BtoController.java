package net.wodie.backend.controller;

import net.wodie.backend.model.BtoItem;
import net.wodie.backend.service.BtoService;
import org.springframework.web.bind.annotation.*;

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

    @SuppressWarnings("java:S4684")
    @PutMapping()
    public BtoItem updateBtoItem(@RequestBody BtoItem updatedBtoItem) {
        return btoService.updateBtoItem(updatedBtoItem);

    }
}
