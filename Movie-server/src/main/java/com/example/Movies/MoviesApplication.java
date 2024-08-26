package com.example.Movies;

import java.time.Instant;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Movies.model.Role;
import com.example.Movies.repository.RoleRepo;

@SpringBootApplication
@RestController
@EnableAsync
public class MoviesApplication {

	public static void main(String[] args) {
		SpringApplication.run(MoviesApplication.class, args);
	}

	@Bean
	public CommandLineRunner runner(RoleRepo roleRepo) {
		return args -> {
			if (roleRepo.findByName("USER").isEmpty()) {
				roleRepo.save(Role.builder().name("USER").build());
			}
		};
	}

	@GetMapping("/hello")
	public String helloWorld() {
		return "Hello world";
	}
}
