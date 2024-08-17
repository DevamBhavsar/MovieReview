package com.example.Movies.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Movies.model.Movies;
import com.example.Movies.repository.MovieRepo;

@Service
public class MovieService { 
    @Autowired
    private MovieRepo movieRepo;
    public List<Movies> allMovies(){
        return  movieRepo.findAll();
    }
    public Optional<Movies> singlMovie(String imdbId){
        return movieRepo.findByImdbId(imdbId);
    }
    public Movies updateMovie(String imdbId, Movies updatedMovie) {
        Optional<Movies> existingMovie = movieRepo.findByImdbId(imdbId);
        if (existingMovie.isPresent()) {
            Movies movieToUpdate = existingMovie.get();
            movieToUpdate.setTitle(updatedMovie.getTitle());
            movieToUpdate.setReleaseDate(updatedMovie.getReleaseDate());
            movieToUpdate.setTrailerLink(updatedMovie.getTrailerLink());
            movieToUpdate.setGenres(updatedMovie.getGenres());
            movieToUpdate.setPoster(updatedMovie.getPoster());
            movieToUpdate.setBackdrops(updatedMovie.getBackdrops());
            movieToUpdate.setReviewIds(updatedMovie.getReviewIds());
            
            return movieRepo.save(movieToUpdate);
        }
        return null;
    }

}
