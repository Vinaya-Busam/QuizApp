package com.quizapp.quizapp.dto.request;

import lombok.Data;
import java.util.List;

@Data 
public class QuizSubmissionRequest {
    
    private Integer quizId;
    private List<AnswerRequest> answers;
}
