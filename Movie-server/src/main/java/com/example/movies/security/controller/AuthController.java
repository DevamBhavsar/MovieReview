package com.example.movies.security.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.movies.payload.request.LoginRequest;
import com.example.movies.payload.request.SignupRequest;
import com.example.movies.payload.response.LoginResponse;
import com.example.movies.security.service.AuthenticationService;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationService authservice;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest)
            throws MessagingException {
        log.info("Received signup request for user: {}", signUpRequest.getUsername());
        authservice.registerUser(signUpRequest);
        log.info("User registration completed for: {}", signUpRequest.getUsername());
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest request) {
        log.debug("Received login request: {}", request);
        return ResponseEntity.ok(authservice.login(request));
    }


    @GetMapping("/activate-account")
    public void confirm(@RequestParam String token) throws MessagingException {
        authservice.activateAccount(token);
    }

}
