package com.example.movies.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.example.movies.model.Movies;
import com.example.movies.model.Reviews;
import com.example.movies.repository.ReviewRepo;

@Service
public class ReviewsService {
    @Autowired
    private ReviewRepo reviewRepo;
    @Autowired
    private  MongoTemplate mongoTemplate;
    public Reviews createReviews (String reviewBody, String imdbId){
        Reviews review = reviewRepo.insert(new Reviews(reviewBody));
        mongoTemplate.update(Movies.class)
            .matching(Criteria.where("imdbId").is(imdbId))
            .apply(new Update().push("reviewIds").value(review))
            .first();

        return  review;


    }
    public Reviews createReview(String string, String string2) {
        throw new UnsupportedOperationException("Unimplemented method 'createReview'");
    }

}
