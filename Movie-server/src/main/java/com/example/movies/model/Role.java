package com.example.movies.model;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "roles")
public class Role {
  @Id
  private String id;
  @Indexed(unique = true)
  private String name;

  @CreatedDate
  @NotNull
  @Field(write = Field.Write.ALWAYS)
  private Instant createdDate;

  @LastModifiedDate
  @NotNull
  @Field(write = Field.Write.NON_NULL)
  private LocalDateTime lastUpdatedDate;
    
  @DBRef
  @Builder.Default
  @JsonIgnore
  private Set<User> users = new HashSet<>();

//   public Role() {
//   }


  public String getId() {
      return id;
  }

  public void setId(String id) {
      this.id = id;
  }


  public void setName(String name) {
      this.name = name;
  }
}
