# MovieReview

MovieReview is a web application that allows users to browse, review, and rate movies. It provides a platform for movie enthusiasts to share their opinions and discover new films.

## Features

- User authentication and authorization
- Browse and search for movies
- View detailed movie information
- Write and read movie reviews
- Rate movies



## Technology Stack

- Backend: Java with Spring Boot
- Frontend: React
- Database: MongoDB
- Authentication: Spring Security
- API: RESTful API using Spring Web

## Project Structure

The project is divided into two main parts:

1. Backend (Java + Spring Boot)
   - `src/main/java`: Contains Java source code
   - `src/main/resources`: Contains application properties and static resources
   - `src/test`: Contains unit and integration tests

2. Frontend (React)
   - `src`: Contains React components, styles, and assets
   - `public`: Contains the main HTML file and other static assets

## Setup and Installation

### Backend

1. Ensure you have Java JDK 11 or later installed
2. Install MongoDB and make sure it's running
3. Clone the repository
4. Navigate to the backend directory
5. Run `./mvnw spring-boot:run` (or `mvnw.cmd spring-boot:run` on Windows)

### Frontend

1. Ensure you have Node.js and npm installed
2. Navigate to the frontend directory
3. Run `npm install` to install dependencies
4. Run `npm start` to start the development server

## API Endpoints

The backend provides a RESTful API for interacting with movies and reviews. Key endpoints include:

- `GET /api/movies`: List all movies
- `POST /api/movies`: Create a new movie
- `GET /api/movies/{id}`: Retrieve a specific movie
- `PUT /api/movies/{id}`: Update a specific movie
- `DELETE /api/movies/{id}`: Delete a specific movie
- `GET /api/reviews`: List all reviews
- `POST /api/reviews`: Create a new review
- `GET /api/reviews/{id}`: Retrieve a specific review
- `PUT /api/reviews/{id}`: Update a specific review
- `DELETE /api/reviews/{id}`: Delete a specific review

## Testing

### Backend
The backend includes unit and integration tests. Run tests using:

