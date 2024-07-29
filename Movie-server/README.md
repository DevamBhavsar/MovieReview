# MovieReview Server

This is the server-side component of the MovieReview application, built using Java Spring Boot.

## Features

- RESTful API for movie data
- MongoDB integration for data storage
- CRUD operations for movies and reviews

## Project Structure

- `Movies.java`: Defines the Movie model
- `MovieController.java`: Handles HTTP requests for movie-related operations
- `MovieService.java`: Contains business logic for movie operations
- `MovieRepo.java`: Interface for database operations (not shown in the provided context, but likely exists)

## API Endpoints

- `GET /api/v1/movies`: Retrieve all movies
- `GET /api/v1/movies/{imdbId}`: Retrieve a single movie by IMDB ID

## Setup and Running

1. Ensure you have Java and Maven installed
2. Clone the repository
3. Navigate to the Movie-server directory
4. Run `mvn spring-boot:run` to start the server

## Dependencies

- Spring Boot
- Spring Data MongoDB
- Lombok (for reducing boilerplate code)

## Configuration

Ensure your MongoDB connection details are properly set in the `application.properties` or `application.yml` file.

