package com.demo.ecommerce.controller;


import com.demo.ecommerce.dto.JwtLogin;
import com.demo.ecommerce.dto.LoginResponse;
import com.demo.ecommerce.filters.JwtAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private Logger logger = LoggerFactory.getLogger(AuthController.class);

    public AuthController(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody JwtLogin jwtLogin) {
        logger.info("User: " + jwtLogin.getEmail() + " try to login.");
        return jwtAuthenticationFilter.login(jwtLogin);
    }

}
