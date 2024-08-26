package com.example.Movies.errors;

import org.springframework.http.HttpStatus;

import lombok.Getter;

public enum BusinessErrorCodes {

    NO_CODE(0, HttpStatus.NOT_IMPLEMENTED, "No code defined"),
    INCORRECT_CURRENT_PASSWORD(300, HttpStatus.BAD_REQUEST, "Incorrect current password"),
    NEW_PASSWORD_DOES_NOT_MATCH(301, HttpStatus.BAD_REQUEST, "New password does not match"),
    ACCOUNT_LOCKED(302, HttpStatus.FORBIDDEN, "Account locked"),
    ACCOUNT_DISABLED(303, HttpStatus.FORBIDDEN, "Account disabled"),
    BAD_CREDENTIALS(304, HttpStatus.FORBIDDEN, "login and / or password is incorrect"),
    ;
    
    @Getter
    private final int code;
    @Getter
    private final HttpStatus httpStatus;
    @Getter
    private final String description;
    private BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.httpStatus = httpStatus;
        this.description = description;
    }
    
}
