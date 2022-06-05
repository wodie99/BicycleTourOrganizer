package net.wodie.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/user/")
public class AppUserController {

    @GetMapping("me")
    public String getLoggedInUser(Principal principal) {
        return principal.getName();
    }
}
