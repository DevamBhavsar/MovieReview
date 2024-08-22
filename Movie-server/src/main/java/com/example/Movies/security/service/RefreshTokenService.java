package com.example.Movies.security.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.Movies.exception.TokenRefreshException;
import com.example.Movies.model.RefreshToken;
import com.example.Movies.repository.RefreshTokenRepository;
import com.example.Movies.repository.UserRepo;

@Service
public class RefreshTokenService {
  @Value("${spring.app.jwtExpirationMs}")
  private Long refreshTokenDurationMs;

  @Autowired
  private RefreshTokenRepository refreshTokenRepository;

  @Autowired
  private UserRepo userRepository;

  public Optional<RefreshToken> findByToken(String token) {
      return refreshTokenRepository.findByToken(token);
  }

  public RefreshToken createRefreshToken(String userId) {
      RefreshToken refreshToken = new RefreshToken();

      refreshToken.setUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
      refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
      refreshToken.setToken(UUID.randomUUID().toString());

      refreshToken = refreshTokenRepository.save(refreshToken);
      return refreshToken;
  }

  public RefreshToken verifyExpiration(RefreshToken token) {
      if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
          refreshTokenRepository.delete(token);
          throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
      }

      return token;
  }
}
