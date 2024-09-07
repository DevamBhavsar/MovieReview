package com.example.movies.security.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.movies.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class JwtService {

    @Value("${spring.application.security.jwt.jwtExpiration}")
    private long jwtExpiration;

    @Value("${spring.application.security.jwt.jwtSecret}")
    private String secretKey;

    public String extractEmail(String token) {
        String email = extractClaims(token, Claims::getSubject);
        log.info("Extracted email from token: {}", email);
        return email;
    }

    public <T> T extractClaims(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public Claims extractAllClaims(String token) {
        Claims claims = Jwts.parser().verifyWith(getSingInKey()).build().parseSignedClaims(token)
                .getPayload();
        log.info("Extracted claims from token: {}", claims);
        return claims;
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> claims, UserDetails userDetails) {
        User user = (User) userDetails;
        claims.put("email", user.getEmail());
        claims.put("username", user.getUsername());
        return buildToken(claims, userDetails, jwtExpiration);
    }

    private String buildToken(Map<String, Object> claims, UserDetails userDetails,
            long jwtExpiration) {
        var authorities =
                userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        return Jwts.builder()
                .claims(claims)
                .subject(((User) userDetails).getEmail()) // Cast to User and get email
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .claim("authorities", authorities)
                .signWith(getSingInKey())
                .compact();
    }

    private SecretKey getSingInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Boolean isTokenValid(String token, UserDetails userDetails) {
        final String email = extractEmail(token);
        boolean emailMatches = email.equals(userDetails.getUsername());
        boolean tokenNotExpired = !isTokenExpired(token);
        log.info("Email match: {}, Token not expired: {}", emailMatches, tokenNotExpired);
        return emailMatches && tokenNotExpired;
    }

    private boolean isTokenExpired(String token) {
        Date expiration = extractExpiration(token);
        boolean isExpired = expiration.before(new Date());
        log.info("Token expiration time: {}, Is expired: {}", expiration, isExpired);
        return isExpired;
    }

    private Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }
}
