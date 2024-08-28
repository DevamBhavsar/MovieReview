package com.example.movies.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.movies.dto.MovieWithReviewsDTO;
import com.example.movies.dto.MovieWithReviewsDTO.ReviewDTO;
import com.example.movies.model.Movies;
import com.example.movies.service.MovieService;

@RestController
@RequestMapping("/movies")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public ResponseEntity<List<Movies>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/{imdbId}")
    public ResponseEntity<MovieWithReviewsDTO> getMovieByImdbId(@PathVariable String imdbId) {
        return movieService.getMovieByImdbIdWithReviews(imdbId)
                .map(this::convertToDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private MovieWithReviewsDTO convertToDTO(Movies movie) {
        MovieWithReviewsDTO dto = new MovieWithReviewsDTO();
        
        // Set movie fields
        dto.setImdbId(movie.getImdbId());
        dto.setTitle(movie.getTitle());
        dto.setReleaseDate(movie.getReleaseDate());
        dto.setTrailerLink(movie.getTrailerLink());
        dto.setPoster(movie.getPoster());
        dto.setGenres(movie.getGenres());
        dto.setBackdrops(movie.getBackdrops());

        // Set reviews
        List<ReviewDTO> reviewDTOs = movie.getReviewIds().stream()
                .map(review -> new ReviewDTO(review.getBody(), review.getUser().getUsername()))
                .collect(Collectors.toList());
        dto.setReviews(reviewDTOs);

        return dto;
    }

    @PutMapping("/{imdbId}")
    public ResponseEntity<Movies> updateMovie(@PathVariable String imdbId, @RequestBody Movies updatedMovie) {
        return movieService.updateMovie(imdbId, updatedMovie)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}