package net.wodie.backend.controller;

import net.wodie.backend.model.BtoItem;
import net.wodie.backend.repository.BtoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BtoControllerTest {

    @LocalServerPort
    private int port;

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
        BtoItem item1 = new BtoItem("1", "t01c1o01","action","Actionpoint 01",
                "First Day","<p>Testeintrag</p>","open","U11",
                new String[]{"U12","U13"}, new String[]{"U15"});
        btoRepository.insert(item1);

        //WHEN
        List<BtoItem> actual = testClient.get()
                .uri("/api/btoItem")
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(BtoItem.class)
                .returnResult()
                .getResponseBody();

        //then
        List<BtoItem> expected = List.of(new BtoItem("1", "t01c1o01","action",
                "Actionpoint 01", "First Day","<p>Testeintrag</p>","open",
                "U11",new String[]{"U12","U13"}, new String[]{"U15"}));
        assertEquals(expected, actual);
    }

    @Test
    void getAllBtoItems_WrongApi_Error400() {
        //GIVEN
        BtoItem item1 = new BtoItem("1", "t01c1o01", "action", "Actionpoint 01",
                "First Day", "<p>Testeintrag</p>", "open", "U11",
                new String[]{"U12", "U13"}, new String[]{"U15"});
        btoRepository.insert(item1);

        //WHEN
        testClient.get()
                .uri("/api/wrongBtoItem")
                .exchange()
                .expectStatus().is4xxClientError();
    }
}