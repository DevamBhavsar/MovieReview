package com.example.movies.model;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "movies")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movies {
    @Id
    private ObjectId id;
    @NotBlank(message = "IMDB ID cannot be blank")
    private String imdbId;

    @NotBlank(message = "Title cannot be blank")
    private String title;
    private String releaseDate;
    private String trailerLink;
    private String poster;
    private List<String> genres;
    private List<String> backdrops;
    @DocumentReference
    private List<Reviews> reviewIds;

    public void addReview(Reviews review) {
        if (this.reviewIds == null) {
            this.reviewIds = new ArrayList<>();
        }
        this.reviewIds.add(review);
    }
}