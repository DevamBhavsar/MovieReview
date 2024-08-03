package com.example.Movies.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.Movies.model.Reviews;

@Repository
public interface ReviewRepo extends MongoRepository<Reviews, ObjectId>{

}
