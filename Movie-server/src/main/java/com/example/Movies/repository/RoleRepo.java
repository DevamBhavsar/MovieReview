package com.example.Movies.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Movies.model.ERole;
import com.example.Movies.model.Role;


public interface RoleRepo extends MongoRepository<Role, String> {
    Optional<Role>  findByName(ERole name);
    

}
