package com.quizapp.quizapp.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDashboardResponse {

    private Long quizzesAttempted;
    private Long totalQuestions;
    private Long correctAnswers;
    private Long wrongAnswers;
    private Double averageScore;
    private Double bestScore;
}
