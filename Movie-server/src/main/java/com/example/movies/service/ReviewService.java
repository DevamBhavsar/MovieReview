package com.example.movies.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.movies.model.Reviews;
import com.example.movies.repository.MovieRepo;
import com.example.movies.repository.ReviewRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ReviewService {
    private final ReviewRepo reviewRepo;
    private final MovieRepo movieRepo;

    public ReviewService(ReviewRepo reviewRepo, MovieRepo movieRepo) {
        this.reviewRepo = reviewRepo;
        this.movieRepo = movieRepo;
    }
    @Transactional
    public Reviews createReview(Reviews review) {
        Reviews savedReview = reviewRepo.save(review);
        
        return movieRepo.findById(review.getMovie().getId())
                .map(movie -> {
                    movie.addReview(savedReview);
                    movieRepo.save(movie);
                    return savedReview;
                })
                .orElseThrow(() -> new EntityNotFoundException("Movie not found"));
    }
    }
