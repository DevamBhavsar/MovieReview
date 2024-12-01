package com.example.movies.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.movies.model.Movies;
import com.example.movies.repository.MovieRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MovieService {
    private final MovieRepo movieRepo;

    public List<Movies> getAllMovies() {
        return movieRepo.findAll();
    }

    public Optional<Movies> getMovieByImdbId(String imdbId) {
        return movieRepo.findByImdbId(imdbId);
    }

    public Optional<Movies> updateMovie(String imdbId, Movies updatedMovie) {
        return movieRepo.findByImdbId(imdbId)
                .map(movie -> {
                    movie.setTitle(updatedMovie.getTitle());
                    movie.setReleaseDate(updatedMovie.getReleaseDate());
                    movie.setTrailerLink(updatedMovie.getTrailerLink());
                    movie.setGenres(updatedMovie.getGenres());
                    movie.setPoster(updatedMovie.getPoster());
                    movie.setBackdrops(updatedMovie.getBackdrops());
                    return movieRepo.save(movie);
                });
    }

    public Optional<Movies> getMovieByImdbIdWithReviews(String imdbId) {
        return movieRepo.findByImdbId(imdbId)
                .map(movie -> {
                    // Fetch reviews eagerly
                    movie.getReviewIds().size(); // This triggers the lazy loading
                    return movie;
                });
    }
}