package com.example.Movies.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Movies.model.Token;

public interface TokenRepo extends MongoRepository<Token, String> {
    Optional<Token> findByToken(String token);

}
