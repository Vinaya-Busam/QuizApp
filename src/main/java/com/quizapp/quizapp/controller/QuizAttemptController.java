package com.quizapp.quizapp.controller;

import com.quizapp.quizapp.dto.response.QuizAttemptResponse;
import com.quizapp.quizapp.service.QuizAttemptService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attempts")
@SecurityRequirement(name = "bearerAuth")
public class QuizAttemptController {

    private QuizAttemptService quizAttemptService;
    public QuizAttemptController(QuizAttemptService quizAttemptService) {
        this.quizAttemptService = quizAttemptService;
    }

    @GetMapping("/myAttempts")
    public ResponseEntity<List<QuizAttemptResponse>> getMyAttempts(Authentication authentication) {
        return ResponseEntity.ok(quizAttemptService.getMyAttempts(authentication.getName()));
    }
}
