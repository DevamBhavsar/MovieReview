package com.example.movies.exception;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.movies.errors.BusinessErrorCodes;
import com.example.movies.payload.response.ExceptionResponse;

import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;

/**
 * Global exception handler application. This class provides centralized exception handling across
 * all @RequestMapping methods.
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

        /**
         * Handles LockedException which occurs when an account is locked.
         * 
         * @param exception The LockedException instance
         * @return ResponseEntity with UNAUTHORIZED status and error details
         */
        @ExceptionHandler(LockedException.class)
        public ResponseEntity<ExceptionResponse> handleException(LockedException exception) {
                // Build and return response for locked account
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(ExceptionResponse.builder()
                                                .businessErrorCode(BusinessErrorCodes.ACCOUNT_LOCKED
                                                                .getCode())
                                                .businessErrorDescription(
                                                                BusinessErrorCodes.ACCOUNT_LOCKED
                                                                                .getDescription())
                                                .error(exception.getMessage())
                                                .build());
        }

        /**
         * Handles DisabledException which occurs when an account is disabled.
         * 
         * @param exception The DisabledException instance
         * @return ResponseEntity with UNAUTHORIZED status and error details
         */
        @ExceptionHandler(DisabledException.class)
        public ResponseEntity<ExceptionResponse> handleException(DisabledException exception) {
                // Build and return response for disabled account
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(ExceptionResponse.builder()
                                                .businessErrorCode(
                                                                BusinessErrorCodes.ACCOUNT_DISABLED
                                                                                .getCode())
                                                .businessErrorDescription(
                                                                BusinessErrorCodes.ACCOUNT_DISABLED
                                                                                .getDescription())
                                                .error(exception.getMessage())
                                                .build());
        }

        /**
         * Handles BadCredentialsException which occurs when invalid credentials are provided.
         * 
         * @param exception The BadCredentialsException instance
         * @return ResponseEntity with UNAUTHORIZED status and error details
         */
        @ExceptionHandler(BadCredentialsException.class)
        public ResponseEntity<ExceptionResponse> handleException(
                        BadCredentialsException exception) {
                // Build and return response for bad credentials
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(ExceptionResponse.builder()
                                                .businessErrorCode(
                                                                BusinessErrorCodes.BAD_CREDENTIALS
                                                                                .getCode())
                                                .businessErrorDescription(
                                                                BusinessErrorCodes.BAD_CREDENTIALS
                                                                                .getDescription())
                                                .error(BusinessErrorCodes.BAD_CREDENTIALS
                                                                .getDescription())
                                                .build());
        }

        /**
         * Handles MessagingException which occurs during email operations.
         * 
         * @param exception The MessagingException instance
         * @return ResponseEntity with INTERNAL_SERVER_ERROR status and error details
         */
        @ExceptionHandler(MessagingException.class)
        public ResponseEntity<ExceptionResponse> handleException(MessagingException exception) {
                // Build and return response for messaging errors
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(ExceptionResponse.builder()
                                                .error(exception.getMessage())
                                                .build());
        }

        /**
         * Handles MethodArgumentNotValidException which occurs when request validation fails.
         * 
         * @param exception The MethodArgumentNotValidException instance
         * @return ResponseEntity with BAD_REQUEST status and validation error details
         */
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ExceptionResponse> handleException(
                        MethodArgumentNotValidException exception) {
                Set<String> errors = new HashSet<>();
                exception.getBindingResult().getAllErrors().forEach(error -> {
                        String errorMessage = error.getDefaultMessage();
                        errors.add(errorMessage);
                        log.error("Validation error: {}", errorMessage);
                });
                log.error("Full exception: ", exception);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body(ExceptionResponse.builder()
                                                .validationErrors(errors)
                                                .build());
        }

        /**
         * Handles all other uncaught exceptions.
         * 
         * @param exception The Exception instance
         * @return ResponseEntity with INTERNAL_SERVER_ERROR status and error details
         */
        @ExceptionHandler(Exception.class)
        public ResponseEntity<ExceptionResponse> handleException(Exception exception) {
                // Print stack trace for debugging
                exception.printStackTrace();
                // Build and return response for general exceptions
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(ExceptionResponse.builder()
                                                .businessErrorDescription(
                                                                "Internal Error contact Admin")
                                                .error(exception.getMessage())
                                                .build());
        }
}
