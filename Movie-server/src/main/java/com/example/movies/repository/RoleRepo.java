package com.example.movies.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.movies.model.Role;


public interface RoleRepo extends MongoRepository<Role, String> {
    Optional<Role>  findByName(String name);
    

}
