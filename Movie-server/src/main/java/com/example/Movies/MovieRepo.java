package com.example.Movies;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MovieRepo extends MongoRepository<Movies, ObjectId>{
    Optional<Movies> findByImdbId(String imdbId);

}
