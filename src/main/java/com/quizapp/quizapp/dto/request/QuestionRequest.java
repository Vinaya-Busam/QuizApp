package com.quizapp.quizapp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data 
public class QuestionRequest {

    @NotBlank(message = "Question text cannot be empty")
    private String questionText;

    @NotBlank(message = "Option A cannot be empty")
    private String optionA;

    @NotBlank(message = "Option B cannot be empty")
    private String optionB;

    @NotBlank(message = "Option C cannot be empty")
    private String optionC;

    @NotBlank(message = "Option D cannot be empty")
    private String optionD;

    @NotBlank(message = "Correct option is required")
    @Pattern(regexp = "^[ABCD]$", message = "Correct option must be A, B, C, or D")
    private String correctOption;

    @NotNull(message = "Question order is required")
    @Positive(message = "Question order must be greater than 0")
    private Integer questionOrder;

    @NotNull(message = "Quiz ID is required")
    @Positive(message = "Quiz ID must be greater than 0")
    private Integer quizId;
}

