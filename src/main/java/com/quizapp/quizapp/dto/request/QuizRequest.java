package com.quizapp.quizapp.dto.request;

import lombok.*;

@Data 
public class QuizRequest {

    private String title;
    private String description;
    private Integer categoryId;
    private Integer timeLimit;
}
