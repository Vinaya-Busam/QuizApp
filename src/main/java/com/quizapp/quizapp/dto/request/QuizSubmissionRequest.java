package com.quizapp.quizapp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import lombok.Data;
import java.util.List;

@Data 
public class QuizSubmissionRequest {
    
    @NotNull(message = "Quiz ID is required")
    @Positive(message = "Quiz ID must be greater than 0")
    private Integer quizId;

    @NotEmpty(message = "At least one answer is required")
    @Valid
    private List<AnswerRequest> answers;
}
