package com.demo.ecommerce.filters;

import com.auth0.jwt.JWT;
import com.demo.ecommerce.dto.AppUserDetails;
import com.demo.ecommerce.dto.JwtLogin;
import com.demo.ecommerce.dto.JwtProperties;
import com.demo.ecommerce.dto.LoginResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

@Service
public class JwtAuthenticationFilter {

    Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private AuthenticationManager authenticationManager;

    @Autowired
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
    private String generateToken(Authentication authResult) {

        // Grab principal
        AppUserDetails userDetails = (AppUserDetails) authResult.getPrincipal();
        logger.info("Generate token for: " + userDetails.getUsername());

        // Create JWT Token
        String token = JWT.create()
                .withSubject(userDetails.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                .sign(HMAC512(JwtProperties.SECRET.getBytes()));

        return token;
    }

    public LoginResponse login(JwtLogin jwtLogin) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtLogin.getEmail(), jwtLogin.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authenticate);
        String token = generateToken(authenticate);

        return new LoginResponse(jwtLogin.getEmail(),token);
    }
}
