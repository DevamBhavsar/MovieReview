package com.example.Movies.security.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Movies.email.service.EmailService;
import com.example.Movies.email.template.EmailTemplateName;
import com.example.Movies.model.Token;
import com.example.Movies.model.User;
import com.example.Movies.payload.request.LoginRequest;
import com.example.Movies.payload.request.SignupRequest;
import com.example.Movies.payload.response.LoginResponse;
import com.example.Movies.repository.RoleRepo;
import com.example.Movies.repository.TokenRepo;
import com.example.Movies.repository.UserRepo;
import com.example.Movies.security.jwt.JwtService;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final RoleRepo roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepository;
    private final TokenRepo tokenRepository;
    private final EmailService emailService;
    @Value("${spring.application.mailing.frontend.activation-url}")
    private String activationUrl;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    // Register a new user
    public void registerUser(SignupRequest signUpRequest) throws MessagingException {
        // Find the USER role
        var userRole = roleRepository.findByName("USER").orElseThrow(() -> new IllegalStateException("Role USER not found"));
        
        // Create a new user with encoded password
        var user = User.builder()
                .username(signUpRequest.getUsername())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .roles(Set.of(userRole))
                .build();
        
        // Save the user
        userRepository.save(user);
        
        // Send validation email
        try {
            sendValidationEmail(user);
            log.info("Validation email sent for user: {}", user.getUsername());
        } catch (Exception e) {
            log.error("Failed to send validation email for user: {}", user.getUsername(), e);
        }
    }
    

    // Send validation email to the user
    private void sendValidationEmail(User user) throws MessagingException {
        var newToken = generateAndSaveActivationToken(user);
        emailService.sendEmail(user.getEmail(), user.getUsername(), EmailTemplateName.ACTIVATE_ACCOUNT, activationUrl,
                newToken, "Account Activation");
    }

    // Generate and save activation token for the user
    private String generateAndSaveActivationToken(User user) {
        String generatedToken = generateActivationCode(6);
        var token = Token.builder()
                .token(generatedToken)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(token);
        return generatedToken;
    }

    // Generate a random activation code
    private String generateActivationCode(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            codeBuilder.append(randomChar);
        }
        return codeBuilder.toString();
    }

    public LoginResponse login(@Valid LoginRequest request) {
        var auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var claims = new HashMap<String, Object>();
        var user = ((User) auth.getPrincipal());
        claims.put("username", user.getUsername());
        var jwtToken = jwtService.generateToken(claims,user);
        return LoginResponse.builder().token(jwtToken).build();
    }

    @Transactional
    public void activateAccount(String token) throws MessagingException {
        Token savedToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
        if (LocalDateTime.now().isAfter(savedToken.getExpiresAt())) {
            sendValidationEmail(savedToken.getUser());
            throw new RuntimeException("Activation Token expired. New token sent to email");
        }   
        var user = userRepository.findById(savedToken.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
        savedToken.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(savedToken);
    }
}