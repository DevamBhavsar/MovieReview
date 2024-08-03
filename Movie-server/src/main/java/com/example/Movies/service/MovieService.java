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

}
