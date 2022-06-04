package net.wodie.backend.controller;

import net.wodie.backend.dto.BtoVote;
import net.wodie.backend.model.BtoItem;
import net.wodie.backend.repository.BtoRepository;
import net.wodie.backend.security.model.AppUser;
import net.wodie.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BtoControllerTest {

    private String jwtToken;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @LocalServerPort
    private int port;

    @Autowired
    private WebTestClient testClient;

    @Autowired
    private BtoRepository btoRepository;

    @BeforeEach
    public void cleanUp() {
        btoRepository.deleteAll();
        appUserRepository.deleteAll();
        jwtToken = generateJWTToken();
    }

    @Test
    void getAllBtoItemsTest_AllOk() {
        //GIVEN
        btoRepository.insert(initItem1());

        //WHEN
        List<BtoItem> actual = testClient.get()
                .uri("/api/btoItem")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBodyList(BtoItem.class)
                .returnResult()
                .getResponseBody();

        //THEN
        List<BtoItem> expected = List.of(initItem1());
        assertEquals(expected, actual);
    }

    @Test
    void getAllBtoItemsTest_WrongApi_Error400() {
        //GIVEN
        btoRepository.insert(initItem2());

        //WHEN
        testClient.get()
                .uri("/api/wrongBtoItem")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is4xxClientError();
    }

    @Test
    void updateBtoItemByIdTest_successful() {
        //GIVEN
        btoRepository.insert(initItem1());

        //WHEN
        BtoItem actual = testClient.put()
                .uri("/api/btoItem")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(initItem1a())
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(BtoItem.class)
                .returnResult()
                .getResponseBody();

        //THEN
        assertEquals(initItem1a(), actual);
    }

    @Test
    void updateBtoItemByIdTest_withMissingFields() {
        //GIVEN
        btoRepository.insert(initItem1());

        //WHEN
        BtoItem updatedBtoItem = BtoItem.builder()
                .id("1")
                .status("finished")
                .build();
        BtoItem actual = testClient.put()
                .uri("/api/btoItem")
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(updatedBtoItem)
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(BtoItem.class)
                .returnResult()
                .getResponseBody();

        //THEN
        assertNotEquals(initItem1a(), actual);
    }

    @Test
    void getBtoItemStatusByIdTest() {
        //GIVEN
        btoRepository.insert(initItem1());

        //WHEN
        String actual = testClient.get()
//                .uri("/api/btoItem/status/"+initItem1().getId())
                .uri("/api/btoItem/status/1")
                .headers(http -> http.setBearerAuth(jwtToken))
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(String.class)
                .returnResult()
                .getResponseBody();

        //THEN
        assertNotNull(actual);
        String expected = initItem1().getStatus();
        Assertions.assertEquals(expected, actual);
    }

    @Disabled ("Seems to be a problem with embedded MongoDB")
    @Test
    void updateBtoVoteTest() {
        //GIVEN
        btoRepository.insert(initItem1());

        //WHEN
        BtoItem actual = testClient.put()
                .uri("/api/btoItem/vote/"+initItem1().getId())
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(btoVote1())
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(BtoItem.class)
                .returnResult()
                .getResponseBody();

        //THEN
        assertNotNull(actual);
        assertTrue(actual.getActionNotMembers().contains("U15"));
        assertFalse(actual.getActionNotMembers().contains("U15"));
    }

    @Test
    void easyPutTest() {
        //GIVEN
        btoRepository.insert(initItem1());

        //WHEN
        BtoItem actual = testClient.put()
                .uri("/api/btoItem/test/"+initItem1().getId())
                .headers(http -> http.setBearerAuth(jwtToken))
                .bodyValue(btoVote1())
                .exchange()
                .expectStatus().is2xxSuccessful()
                .expectBody(BtoItem.class)
                .returnResult()
                .getResponseBody();

        //THEN
        assertNotNull(actual);
        assertEquals(btoVote1().getUsername(), actual.getTitle1());
        assertEquals(btoVote1().getVote(), actual.getTitle2());
    }

    private BtoVote btoVote1() {
        return BtoVote.builder()
                .username("U15")
                .vote("YES")
                .build();
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
                .actionMembers(List.of("U12", "U13"))
                .actionNotMembers(List.of("U15"))
                .build();
    }

    private BtoItem initItem1a() {
        return BtoItem.builder()
                .id("1")
                .displayId("t01c1o01")
                .category("action")
                .title1("Actionpoint 01")
                .title2("First Day")
                .description("<p>Testeintrag for No1</p>")
                .status("finished")
                .actionOwner("U11")
                .actionMembers(List.of("U12", "U13"))
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
                .actionMembers(List.of("U11", "U13"))
                .actionNotMembers(List.of("U15"))
                .build();
    }

    private String generateJWTToken() {
        String hashedPassword = passwordEncoder.encode("passwort");
        AppUser testUser = AppUser.builder()
                .username("testuser")
                .id("123")
                .password(hashedPassword)
                .build();
        appUserRepository.save(testUser);

        return testClient.post()
                .uri("/auth/login")
                .bodyValue(AppUser.builder()
                        .username("testuser")
                        .id("123")
                        .password("passwort")
                        .build())
                .exchange()
                .expectBody(String.class)
                .returnResult()
                .getResponseBody();
    }
}
