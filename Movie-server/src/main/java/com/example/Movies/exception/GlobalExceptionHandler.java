package com.example.Movies.exception;

import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    publci ResponseEntity<ExceptionResponse> handleException(LockedException exception) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(exception.getMessage(), exception.getClass());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
