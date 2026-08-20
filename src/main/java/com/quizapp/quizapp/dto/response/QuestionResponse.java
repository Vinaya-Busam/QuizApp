package com.quizapp.quizapp.dto.response;

import lombok.Data;
import lombok.Builder ;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Data 
@Builder 
public class QuestionResponse {

    private Integer id;
    private String questionText;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctOption;
    private Integer questionOrder;
    private Integer quizId;
    private String quizTitle;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
