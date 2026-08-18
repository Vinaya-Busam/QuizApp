package com.quizapp.quizapp.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data 
@Builder 
public class QuizResponse {

    private Integer id;
    private String title;
    private String description;
    private Integer categoryId;
    private String categoryName;
    private Integer timeLimit;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
