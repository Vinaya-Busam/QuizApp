package com.quizapp.quizapp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import lombok.*;

@Data 
public class QuizRequest {

    @NotBlank(message = "Quiz Title is required")
    private String title;

    @NotBlank(message = "Quiz description is required")
    private String description;

    @NotNull(message = "Category ID is required")
    @Positive(message = "Category ID must be greater than 0")
    private Integer categoryId;

    private Integer timeLimit;
}
