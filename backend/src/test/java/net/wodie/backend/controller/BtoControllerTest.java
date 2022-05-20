package net.wodie.backend.controller;

import net.wodie.backend.model.BtoItem;
import net.wodie.backend.repository.BtoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BtoControllerTest {

    @Autowired
    private WebTestClient testClient;

    @Autowired
    private BtoRepository btoRepository;

    @BeforeEach
    public void cleanUp() {
        btoRepository.deleteAll();
    }

    @Test
    void getAllBtoItems_AllOk() {
        //GIVEN
        btoRepository.insert(initItem1());

        //WHEN
        List<BtoItem> actual = testClient.get()
                .uri("/api/btoItem")
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(BtoItem.class)
                .returnResult()
                .getResponseBody();

        //then
        List<BtoItem> expected = List.of(initItem1());
        assertEquals(expected, actual);
    }

    @Test
    void getAllBtoItems_WrongApi_Error400() {
        //GIVEN
        btoRepository.insert(initItem2());

        //WHEN
        testClient.get()
                .uri("/api/wrongBtoItem")
                .exchange()
                .expectStatus().is4xxClientError();
    }

    private BtoItem initItem1() {
        return BtoItem.builder()
                .id("1")
                .displayId("t01c1o01")
                .category("action")
                .title1("Actionpoint 01")
                .title2("First Day")
                .description("<p>Testeintrag for No1</p>")
                .status("open")
                .actionOwner("U11")
                .actionMembers(List.of("U12","U13"))
                .actionNotMembers(List.of("U15"))
                .build();
    }

    private BtoItem initItem2() {
        return BtoItem.builder()
                .id("2")
                .displayId("t01c1o02")
                .category("action")
                .title1("Actionpoint 02")
                .title2("First Day")
                .description("<p>Testeintrag for No2</p>")
                .status("open")
                .actionOwner("U12")
                .actionMembers(List.of("U11","U13"))
                .actionNotMembers(List.of("U15"))
                .build();
    }
}