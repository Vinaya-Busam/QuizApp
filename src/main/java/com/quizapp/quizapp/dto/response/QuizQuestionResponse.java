package com.quizapp.quizapp.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuizQuestionResponse {

    private Integer id;
    private String questionText;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String quizTitle;
    private Integer questionOrder;
}
