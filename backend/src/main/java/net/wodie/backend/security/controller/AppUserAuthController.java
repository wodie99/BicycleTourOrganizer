package net.wodie.backend.security.controller;

import net.wodie.backend.security.dto.AppUserLoginDto;
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

    @SuppressWarnings("java:S4684")
    @PostMapping("/login")
    public String login(@RequestBody AppUserLoginDto appUserLoginDto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(appUserLoginDto.getUsername(), appUserLoginDto.getPassword()));
        return jwtUtilService.createToken(appUserLoginDto.getUsername());
    }

}
