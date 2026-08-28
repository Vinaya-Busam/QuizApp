package com.quizapp.quizapp.controller;

import com.quizapp.quizapp.dto.request.QuizSubmissionRequest;
import com.quizapp.quizapp.dto.response.QuizResultResponse;
import com.quizapp.quizapp.service.QuizSubmissionService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "bearerAuth")
public class QuizSubmissionController {

    private QuizSubmissionService quizSubmissionService;
    public QuizSubmissionController(QuizSubmissionService quizSubmissionService) {
        this.quizSubmissionService = quizSubmissionService;
    }

    @PostMapping("/quiz/submit")
    public ResponseEntity<QuizResultResponse> submitQuiz(@Valid @RequestBody QuizSubmissionRequest request) {
        QuizResultResponse response = quizSubmissionService.submitQuiz(request);
        return ResponseEntity.ok(response);
    }

}
