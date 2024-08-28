package com.example.movies.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.example.movies.common.BaseEntity;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Document(collection = "reviews")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class Reviews extends BaseEntity {
    @NotBlank(message = "Review body cannot be blank")
    private String body;

    @DocumentReference(lazy = true)
    private Movies movie;
    
    @DocumentReference(lazy = true)
    private User user;

    public Reviews(String body, Movies movie, User user) {
        this.body = body;
        this.movie = movie;
        this.user = user;
    }
}