package com.example.Movies;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
