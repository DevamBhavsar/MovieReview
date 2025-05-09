package com.example.movies.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.movies.model.Movies;


@Repository
public interface MovieRepo extends MongoRepository<Movies, ObjectId>{
    Optional<Movies> findByImdbId(String imdbId);

}
