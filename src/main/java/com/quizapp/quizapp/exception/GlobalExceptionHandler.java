package com.quizapp.quizapp.exception;

import com.quizapp.quizapp.dto.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(ResourceNotFoundException ex) {
        ErrorResponse response = ErrorResponse.builder()
                                    .status(HttpStatus.NOT_FOUND.value())
                                    .message(ex.getMessage())
                                    .timestamp(LocalDateTime.now())
                                    .build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateResource(DuplicateResourceException ex) {
        ErrorResponse response = ErrorResponse.builder()
                                    .status(HttpStatus.CONFLICT.value())
                                    .message(ex.getMessage())
                                    .timestamp(LocalDateTime.now())
                                    .build();

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }
    
}
