package com.quizapp.quizapp.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminDashboardResponse {

    private Long totalUsers;
    private Long totalQuizzes;
    private Long totalQuestions;
    private Long totalAttempts;
    private Double averageScore;
}
