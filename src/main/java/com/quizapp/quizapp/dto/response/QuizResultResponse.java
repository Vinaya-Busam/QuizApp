package com.quizapp.quizapp.dto.response;

import lombok.Data;
import lombok.Builder;

@Data 
@Builder 
public class QuizResultResponse {

    private Integer quizId;
    private String quizTitle;
    private Integer totalQuestions;
    private Integer correctAnswers;
    private Integer wrongAnswers;
    private Double percentage;
    private Integer score;
}
