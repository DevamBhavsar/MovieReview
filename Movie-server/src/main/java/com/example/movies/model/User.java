package com.example.movies.model;

import java.security.Principal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails, Principal {
  @Id
  private String id;

  @NotBlank
  @Size(max = 20)
  @Indexed(unique = true)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  @Indexed(unique = true)
  private String email;

  @NotBlank
  @Size(max = 120)
  @JsonIgnore
  private String password;

  private Boolean enabled;
  private Boolean accountLocked;

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
  private Set<Role> roles = new HashSet<>();

  public User(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.roles.stream().map(r -> new SimpleGrantedAuthority(r.getName())).collect(Collectors.toSet());
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return !accountLocked;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return enabled;
  }

  @Override
  public String getName() {
    return email;
  }
}