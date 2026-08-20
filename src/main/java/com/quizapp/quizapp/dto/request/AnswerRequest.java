package com.quizapp.quizapp.dto.request;

import lombok.Data;

@Data 
public class AnswerRequest {
    
    private Integer questionId;
    private String selectedOption;
}
