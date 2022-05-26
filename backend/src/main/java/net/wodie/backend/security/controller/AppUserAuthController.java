package net.wodie.backend.security.controller;

import net.wodie.backend.security.model.AppUser;
import net.wodie.backend.security.service.JWTUtilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AppUserAuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtilService jwtUtilService;

    @Autowired
    public AppUserAuthController(AuthenticationManager authenticationManager, JWTUtilService jwtUtilService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtilService = jwtUtilService;
    }

    @PostMapping("/login")
    public String login(@RequestBody AppUser appUser) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(appUser.getUsername(), appUser.getPassword()));
        return jwtUtilService.createToken(appUser.getUsername());
    }

}
