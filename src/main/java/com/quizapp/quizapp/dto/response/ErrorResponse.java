package com.quizapp.quizapp.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
public class ErrorResponse {
    
    private int status;
    private String message;
    private LocalDateTime timestamp;
}
