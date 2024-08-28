package com.example.movies.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.movies.model.Reviews;

@Repository
public interface ReviewRepo extends MongoRepository<Reviews, String>{

}
