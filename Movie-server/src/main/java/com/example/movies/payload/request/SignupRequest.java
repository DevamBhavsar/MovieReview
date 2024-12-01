package com.example.movies.payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
 
@Getter
@Setter
@Builder
public class SignupRequest {
    @NotEmpty(message = "Username is required")
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;
 
    @NotEmpty(message = "Email is required")
    @NotBlank
    @Size(max = 50)
    @Email(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", message = "Please provide a valid email address. It should contain a local part, @ symbol, and a domain (e.g., user@example.com)")
    private String email;
    
    @NotEmpty(message = "Password is required")
    @NotBlank
    @Size(min = 8, max = 40, message = "Password must be between 8 and 40 characters")
    private String password;
}