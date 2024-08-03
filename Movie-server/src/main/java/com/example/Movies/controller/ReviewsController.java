package com.example.Movies.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Movies.model.Reviews;
import com.example.Movies.service.ReviewsService;


@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewsController {
    @Autowired
    private ReviewsService reviewsService;

    @PostMapping()
    public ResponseEntity<Reviews> createReviews (@RequestBody Map<String, String> payload) {
        
        
        return new ResponseEntity<Reviews>(reviewsService.createReviews(payload.get("reviewBody"), payload.get("imdbId")),HttpStatus.CREATED);
    }
    

}
