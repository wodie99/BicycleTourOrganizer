package net.wodie.backend.security.filter;

import lombok.extern.slf4j.Slf4j;
import net.wodie.backend.security.service.JWTUtilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
@Component
public class JWTAuthFilter extends OncePerRequestFilter {

    private final JWTUtilService jwtUtilService;

    @Autowired
    public JWTAuthFilter(JWTUtilService jwtUtilService) {
        this.jwtUtilService = jwtUtilService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = getAuthToken(request);

        try{
            if (token != null && !token.isBlank()){
                String username = jwtUtilService.extractUsername(token);
                setContext(username);
            } else {
                log.warn("Token is null or blank.");
            }
        } catch (Exception ex){
            log.error("JWT error." + ex.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private void setContext(String username) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, "", List.of());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    private String getAuthToken(HttpServletRequest request) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader != null) {
            return authHeader.replace("Bearer ", "").trim();
        }
        return null;
    }
}
