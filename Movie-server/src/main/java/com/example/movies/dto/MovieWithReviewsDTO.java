
package com.example.movies.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieWithReviewsDTO {
    private String imdbId;
    private String title;
    private String releaseDate;
    private String trailerLink;
    private String poster;
    private List<String> genres;
    private List<String> backdrops;
    private List<ReviewDTO> reviews;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReviewDTO {
        private String body;
        private String username;
    }
}
