package com.quizapp.quizapp.dto.request;

import lombok.Data;

@Data 
public class QuestionRequest {

    private String questionText;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctOption;
    private Integer questionOrder;
    private Integer quizId;
}

