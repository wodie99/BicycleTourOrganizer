package net.wodie.backend.service;

import net.wodie.backend.model.BtoItem;
import net.wodie.backend.repository.BtoRepository;
import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BtoServiceTest {
    private final BtoRepository btoRepo = mock(BtoRepository.class);
    private final BtoService btoService = new BtoService(btoRepo);

    @Test
    void getAllBtoItems() {
        //GIVEN
        when(btoRepo.findAll()).thenReturn(List.of(initItem1(), initItem2()));

        //WHEN
        List<BtoItem> actual = btoService.getAllBtoItems();

        //THEN
        List<BtoItem> expected = (List.of(initItem1(), initItem2()));

        verify(btoRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void updateBtoItemById() {
        //GIVEN
        when(btoRepo.save(initItem1a())).thenReturn(initItem1a());

        //WHEN
        BtoItem actual = btoService.updateBtoItem(initItem1a());

        //THEN
        verify(btoRepo).save(initItem1a());
        assertEquals(initItem1a(), actual);
    }

    private BtoItem initItem1() {
        return BtoItem.builder()
                .id("3")
                .displayId("t02c1o01")
                .category("action")
                .title1("Actionpoint 03")
                .title2("Second Day")
                .description("<p>Testeintrag for No3</p>")
                .status("open")
                .actionOwner("U11")
                .actionMembers(List.of("U12","U13"))
                .actionNotMembers(List.of("U15"))
                .build();
    }

    private BtoItem initItem1a() {
        return BtoItem.builder()
                .id("3")
                .displayId("t02c1o01")
                .category("action")
                .title1("Actionpoint 03")
                .title2("Second Day")
                .description("<p>Testeintrag for No3</p>")
                .status("finished")
                .actionOwner("U11")
                .actionMembers(List.of("U12","U13"))
                .actionNotMembers(List.of("U15"))
                .build();
    }

    private BtoItem initItem2() {
        return BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Actionpoint 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("open")
                .actionOwner("U12")
                .actionMembers(List.of("U11","U13"))
                .actionNotMembers(List.of("U15"))
                .build();
    }
}
