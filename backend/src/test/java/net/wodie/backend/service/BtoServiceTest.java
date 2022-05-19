package net.wodie.backend.service;

import net.wodie.backend.model.BtoItem;
import net.wodie.backend.repository.BtoRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BtoServiceTest {
    private final BtoRepository btoRepo = mock(BtoRepository.class);
    private final BtoService btoService = new BtoService(btoRepo);


    @Test
    void getAllBtoItems() {
        //GIVEN
        BtoItem item1 = new BtoItem("1", "t01c1o01", "action", "Actionpoint 01",
                "First Day", "<p>Testeintrag</p>", "open", "U11",
                new String[]{"U12", "U13"}, new String[]{"U15"});
        BtoItem item2 = new BtoItem("2", "t01c1o02", "action", "Actionpoint 02",
                "First Day", "<p>Testeintrag Nr.2</p>", "open", "U12",
                new String[]{"U11", "U13"}, new String[]{"U15"});
        when(btoRepo.findAll()).thenReturn(List.of(item1, item2));

        //WHEN
        List<BtoItem> actual = btoService.getAllBtoItems();

        //THEN
        List<BtoItem> expected = List.of(new BtoItem("1", "t01c1o01", "action",
                "Actionpoint 01", "First Day", "<p>Testeintrag</p>", "open",
                "U11", new String[]{"U12", "U13"}, new String[]{"U15"}), new BtoItem("2",
                "t01c1o02", "action", "Actionpoint 02",
                "First Day", "<p>Testeintrag Nr.2</p>", "open", "U12",
                new String[]{"U11", "U13"}, new String[]{"U15"}));

        verify(btoRepo).findAll();
        assertEquals(expected, actual);
    }
}