package com.quizapp.quizapp.controller;

import com.quizapp.quizapp.dto.request.QuestionRequest;
import com.quizapp.quizapp.dto.response.QuestionResponse;
import com.quizapp.quizapp.dto.response.QuizQuestionResponse;
import com.quizapp.quizapp.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "bearerAuth")
public class QuestionController {

    private QuestionService questionService;
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/question/create")
    public ResponseEntity<QuestionResponse> createQuestion(@Valid @RequestBody QuestionRequest request) {
        QuestionResponse response = questionService.createQuestion(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/getAllQuestions")
    public ResponseEntity<List<QuestionResponse>> getAllQuestions() {
        List<QuestionResponse> responses = questionService.getAllQuestions();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/getQuestion/{id}")
    public ResponseEntity<QuestionResponse> getQuestionById(@PathVariable Integer id) {
        QuestionResponse response = questionService.getQuestionById(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/quizzes/{quizId}/questions")
    public ResponseEntity<List<QuestionResponse>> getQuestionsByQuiz(@PathVariable Integer quizId) {
        List<QuestionResponse> responses = questionService.getQuestionsByQuiz(quizId);
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/quiz/{quizId}/questions")
    public ResponseEntity<List<QuizQuestionResponse>> getQuestionsForQuiz(@PathVariable Integer quizId) {
        return ResponseEntity.ok(questionService.getQuestionsForQuiz(quizId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/updateQuestion/{id}")
    public ResponseEntity<QuestionResponse> updatedQuestion(@PathVariable Integer id, @Valid @RequestBody QuestionRequest request) {
        QuestionResponse updatedQuestion = questionService.updateQuestion(id, request);
        return ResponseEntity.ok(updatedQuestion);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/deleteQuestion/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Integer id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
