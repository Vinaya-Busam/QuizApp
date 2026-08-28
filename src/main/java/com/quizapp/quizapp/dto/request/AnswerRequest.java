package com.quizapp.quizapp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Data;

@Data 
public class AnswerRequest {
    
    @NotNull(message = "Question ID cannot be empty")
    private Integer questionId;

    @NotBlank(message = "Selected Option is required")
    private String selectedOption;
}
