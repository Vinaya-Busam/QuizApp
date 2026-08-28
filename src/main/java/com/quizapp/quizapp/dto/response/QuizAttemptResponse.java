package com.quizapp.quizapp.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class QuizAttemptResponse {

    private Integer id;
    private Integer quizId;
    private String quizTitle;
    private Integer totalQuestions;
    private Integer correctAnswers;
    private Integer wrongAnswers;
    private Integer score;
    private Double percentage;
    private LocalDateTime attemptedAt;
}
