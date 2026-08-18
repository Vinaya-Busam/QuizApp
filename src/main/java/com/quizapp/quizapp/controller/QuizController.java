package com.quizapp.quizapp.controller;

import com.quizapp.quizapp.dto.request.QuizRequest;
import com.quizapp.quizapp.dto.response.QuizResponse;
import com.quizapp.quizapp.service.QuizService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "bearerAuth")
public class QuizController {

    private QuizService quizService;
    public QuizController(QuizService quizService){
        this.quizService = quizService;
    }

    @GetMapping("/getAllQuizzes")
    public ResponseEntity<List<QuizResponse>> getAllQuizzes() {
        List<QuizResponse> responses = quizService.getAllQuizzes();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/quiz/create")
    public ResponseEntity<QuizResponse> createQuiz(@RequestBody QuizRequest request) {
        QuizResponse response = quizService.createQuiz(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/getQuiz/{id}")
    public ResponseEntity<QuizResponse> getQuizById(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(quizService.getQuizById(id));
    }

    @GetMapping("/categories/{categoryId}/quizzes")
    public ResponseEntity<List<QuizResponse>> getQuizzesByCategory(@PathVariable Integer categoryId) {
        List<QuizResponse> responses = quizService.getQuizzesByCategory(categoryId);
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/updateQuiz/{id}")
    public ResponseEntity<QuizResponse> updatedQuiz(@PathVariable Integer id, @RequestBody QuizRequest request) {
        QuizResponse updatedQuiz = quizService.updateQuiz(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(updatedQuiz);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteQuiz/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Integer id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }

}
