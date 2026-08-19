package com.quizapp.quizapp.dto.request;

import lombok.Data;

@Data 
public class QuestionRequest {

    private String questionText;
    private Integer questionOrder;
    private Integer quizId;
}

