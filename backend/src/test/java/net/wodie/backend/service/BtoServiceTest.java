package net.wodie.backend.service;

import net.wodie.backend.dto.BtoVote;
import net.wodie.backend.model.BtoItem;
import net.wodie.backend.repository.BtoRepository;
import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.NoSuchElementException;
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
    void updateBtoItem_statusFinished() {
        //GIVEN
        when(btoRepo.save(initItem1a())).thenReturn(initItem1a());

        //WHEN
        BtoItem actual = btoService.updateBtoItem(initItem1a());

        //THEN
        verify(btoRepo).save(initItem1a());
        assertEquals(initItem1a(), actual);
    }

    @Test
    void updateBtoItem_statusNew() {
        //GIVEN
        BtoItem initItem1a = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("NEW")
                .actionOwner("U12")
                .actionMembers(List.of("U11","U13"))
                .actionNotMembers(List.of("U15"))
                .build();

        BtoItem initItem1b = BtoItem.builder()
                    .id("4")
                    .displayId("t02c1o02")
                    .category("action")
                    .title1("Action No 04")
                    .title2("Second Day")
                    .description("<p>Testeintrag for No4</p>")
                    .status("NEW")
                    .actionOwner("")
                    .actionMembers(List.of())
                    .actionNotMembers(List.of())
                    .build();

        when(btoRepo.save(initItem1b)).thenReturn(initItem1b);

        //WHEN
        BtoItem actual = btoService.updateBtoItem(initItem1a);

        //THEN
        verify(btoRepo).save(initItem1b);
        assertEquals(initItem1a, actual);
    }

    @Test
    void updateBtoItem_statusPrep4vote() {
        //GIVEN
        BtoItem initItem1a = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("PREP4VOTE")
                .actionOwner("U12")
                .actionMembers(List.of())
                .actionNotMembers(List.of())
                .build();

        BtoItem initItem1b = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("PREP4VOTE")
                .actionOwner("U12")
                .actionMembers(List.of())
                .actionNotMembers(List.of())
                .build();

        when(btoRepo.save(initItem1b)).thenReturn(initItem1b);

        //WHEN
        BtoItem actual = btoService.updateBtoItem(initItem1a);

        //THEN
        verify(btoRepo).save(initItem1b);
        assertEquals(initItem1a, actual);
    }

    @Test
    void getBtoItemStatusById_validId() {
        //GIVEN
        when(btoRepo.findById("3")).thenReturn(Optional.of(initItem1()));

        //WHEN
        String actual = btoService.getBtoItemStatusById("3");

        //THEN
        verify(btoRepo).findById("3");
        assertEquals("VOTE", actual);
    }

    @Test
    void getBtoItemStatusById_unknownId() {
        //GIVEN
        when(btoRepo.findById("5")).thenReturn(Optional.empty());

        //WHEN
        assertThrows(NoSuchElementException.class, () -> btoService.getBtoItemStatusById("5"));
        verify(btoRepo).findById("5");
    }

    @Test
    void getBtoItemStatusById_emptyId() {
        //GIVEN
        when(btoRepo.findById("")).thenReturn(Optional.empty());

        //WHEN
        assertThrows(NoSuchElementException.class, () -> btoService.getBtoItemStatusById(""));
        verify(btoRepo).findById("");
    }

    @Test
    void updateBtoVote_voteYes_emptyField() {
        BtoItem initItem1a = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("VOTE")
                .actionOwner("U12")
                .actionMembers(List.of())
                .actionNotMembers(List.of())
                .build();

        BtoItem initItem1b = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("VOTE")
                .actionOwner("U12")
                .actionMembers(List.of("U10"))
                .actionNotMembers(List.of())
                .build();

        BtoVote btoVote = BtoVote.builder()
                .username("U10")
                .vote("YES")
                .build();

        when(btoRepo.findById(initItem1b.getId())).thenReturn(Optional.of(initItem1a));
        when(btoRepo.save(initItem1a)).thenReturn(initItem1b);

        //WHEN
        BtoItem actual = btoService.updateBtoVote(initItem1a.getId(),btoVote);

        //THEN
        verify(btoRepo).findById(initItem1a.getId());
        verify(btoRepo).save(initItem1b);
        assertEquals(initItem1b, actual);
    }

    @Test
    void updateBtoVote_voteNo_emptyField() {
        BtoItem initItem1a = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("VOTE")
                .actionOwner("U12")
                .actionMembers(List.of())
                .actionNotMembers(List.of())
                .build();

        BtoItem initItem1b = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("VOTE")
                .actionOwner("U12")
                .actionMembers(List.of())
                .actionNotMembers(List.of("U10"))
                .build();

        BtoVote btoVote = BtoVote.builder()
                .username("U10")
                .vote("NO")
                .build();

        when(btoRepo.findById(initItem1b.getId())).thenReturn(Optional.of(initItem1a));
        when(btoRepo.save(initItem1a)).thenReturn(initItem1b);

        //WHEN
        BtoItem actual = btoService.updateBtoVote(initItem1a.getId(),btoVote);

        //THEN
        verify(btoRepo).findById(initItem1a.getId());
        verify(btoRepo).save(initItem1b);
        assertEquals(initItem1b, actual);
    }

    @Test
    void updateBtoVote_voteYes_fullField() {
        BtoItem initItem1a = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("VOTE")
                .actionOwner("U12")
                .actionMembers(List.of("U11","U12"))
                .actionNotMembers(List.of("U10"))
                .build();

        BtoItem initItem1b = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("VOTE")
                .actionOwner("U12")
                .actionMembers(List.of("U11","U12","U10"))
                .actionNotMembers(List.of())
                .build();

        BtoVote btoVote = BtoVote.builder()
                .username("U10")
                .vote("YES")
                .build();

        when(btoRepo.findById(initItem1b.getId())).thenReturn(Optional.of(initItem1a));
        when(btoRepo.save(initItem1a)).thenReturn(initItem1b);

        //WHEN
        BtoItem actual = btoService.updateBtoVote(initItem1a.getId(),btoVote);

        //THEN
        verify(btoRepo).findById(initItem1a.getId());
        verify(btoRepo).save(initItem1b);
        assertEquals(initItem1b, actual);
    }

    @Test
    void updateBtoVote_voteNo_fullField() {
        BtoItem initItem1a = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("VOTE")
                .actionOwner("U12")
                .actionMembers(List.of("U11","U10"))
                .actionNotMembers(List.of("U13"))
                .build();

        BtoItem initItem1b = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("VOTE")
                .actionOwner("U12")
                .actionMembers(List.of("U11"))
                .actionNotMembers(List.of("U13", "U10"))
                .build();

        BtoVote btoVote = BtoVote.builder()
                .username("U10")
                .vote("NO")
                .build();

        when(btoRepo.findById(initItem1b.getId())).thenReturn(Optional.of(initItem1a));
        when(btoRepo.save(initItem1a)).thenReturn(initItem1b);

        //WHEN
        BtoItem actual = btoService.updateBtoVote(initItem1a.getId(),btoVote);

        //THEN
        verify(btoRepo).findById(initItem1a.getId());
        verify(btoRepo).save(initItem1b);
        assertEquals(initItem1b, actual);
    }

    @Test
    void updateBtoVote_voteYes_userAlreadyInList() {
        BtoItem initItem1a = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("VOTE")
                .actionOwner("U12")
                .actionMembers(List.of("U10","U12"))
                .actionNotMembers(List.of("U10"))
                .build();

        BtoItem initItem1b = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("VOTE")
                .actionOwner("U12")
                .actionMembers(List.of("U10","U12"))
                .actionNotMembers(List.of())
                .build();

        BtoVote btoVote = BtoVote.builder()
                .username("U10")
                .vote("YES")
                .build();

        when(btoRepo.findById(initItem1b.getId())).thenReturn(Optional.of(initItem1a));
        when(btoRepo.save(initItem1a)).thenReturn(initItem1b);

        //WHEN
        BtoItem actual = btoService.updateBtoVote(initItem1a.getId(),btoVote);

        //THEN
        verify(btoRepo).findById(initItem1a.getId());
        verify(btoRepo).save(initItem1b);
        assertEquals(initItem1b, actual);
    }

    @Test
    void updateBtoVote_voteYes_wrongStatus() {
        BtoItem initItem1a = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("PREP4VOTE")
                .actionOwner("U12")
                .actionMembers(List.of("U10","U12"))
                .actionNotMembers(List.of("U10"))
                .build();

        BtoItem initItem1b = BtoItem.builder()
                .id("4")
                .displayId("t02c1o02")
                .category("action")
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("PREP4VOTE")
                .actionOwner("U12")
                .actionMembers(List.of("U10","U12"))
                .actionNotMembers(List.of())
                .build();

        BtoVote btoVote = BtoVote.builder()
                .username("U10")
                .vote("YES")
                .build();

        when(btoRepo.findById(initItem1b.getId())).thenReturn(Optional.of(initItem1a));

        //WHEN/THEN
        assertThrows(IllegalStateException.class, () -> btoService.updateBtoVote("4",btoVote));
    }

    @Test
    void updateBtoVote_voteYes_unknownId() {
        //GIVEN
        BtoVote btoVote = BtoVote.builder()
                .username("U10")
                .vote("YES")
                .build();

        //WHEN/THEN
        assertThrows(NoSuchElementException.class, () -> btoService.updateBtoVote("99",btoVote));
    }




    private BtoItem initItem1() {
        return BtoItem.builder()
                .id("3")
                .displayId("t02c1o01")
                .category("action")
                .title1("Action No 03")
                .title2("Second Day")
                .description("<p>Testeintrag for No3</p>")
                .status("VOTE")
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
                .title1("Action No 03")
                .title2("Second Day")
                .description("<p>Testeintrag for No3</p>")
                .status("FINISHED")
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
                .title1("Action No 04")
                .title2("Second Day")
                .description("<p>Testeintrag for No4</p>")
                .status("NEW")
                .actionOwner("U12")
                .actionMembers(List.of("U11","U13"))
                .actionNotMembers(List.of("U15"))
                .build();
    }


}
