package com.example.movies.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.movies.model.Token;

public interface TokenRepo extends MongoRepository<Token, String> {
    Optional<Token> findByToken(String token);

}
