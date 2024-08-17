package com.example.Movies.controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Movies.model.Movies;
import com.example.Movies.service.MovieService;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {
    @Autowired
    private MovieService movieService;

    // @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<Movies>> getAllMovies() {
        return new ResponseEntity<List<Movies>>( movieService.allMovies(),HttpStatus.OK);
    }

    // @PreAuthorize("isAuthenticated()")
    @GetMapping("/{imdbId}")
    public ResponseEntity<Optional<Movies>> getSingleMovie(@PathVariable String imdbId) {
        return new ResponseEntity<Optional<Movies>>(movieService.singlMovie(imdbId), HttpStatus.OK);
    }

    // @PreAuthorize("isAuthenticated()")
    @PutMapping("/{imdbId}")
    public ResponseEntity<Movies> updateMovie(@PathVariable String imdbId, @RequestBody Movies updateMovies) {
        Movies movie = movieService.updateMovie(imdbId, updateMovies);
        if (movie != null) {
            return new ResponseEntity<>(movie, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
