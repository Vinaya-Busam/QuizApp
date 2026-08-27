package com.quizapp.quizapp.service;

import com.quizapp.quizapp.dto.response.QuizAttemptResponse;
import com.quizapp.quizapp.entity.QuizAttempt;
import com.quizapp.quizapp.entity.User;
import com.quizapp.quizapp.exception.ResourceNotFoundException;
import com.quizapp.quizapp.repository.QuizAttemptRepository;
import com.quizapp.quizapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizAttemptService {

    private QuizAttemptRepository quizAttemptRepo;
    private UserRepository userRepo;
    public QuizAttemptService(QuizAttemptRepository quizAttemptRepo, UserRepository userRepo) {
        this.quizAttemptRepo = quizAttemptRepo;
        this.userRepo = userRepo;
    }

    public List<QuizAttemptResponse> getMyAttempts(String email) {
        User user = userRepo.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return quizAttemptRepo
                .findByUserIdOrderByAttemptedAtDesc(user.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private QuizAttemptResponse mapToResponse(QuizAttempt attempt) {

        return QuizAttemptResponse.builder()
                                .id(attempt.getId())
                                .quizId(attempt.getQuiz().getId())
                                .quizTitle(attempt.getQuiz().getTitle())
                                .totalQuestions(attempt.getTotalQuestions())
                                .wrongAnswers(attempt.getWrongAnswers())
                                .score(attempt.getScore())
                                .percentage(attempt.getPercentage())
                                .attemptedAt(attempt.getAttemptedAt())
                                .build();
    }
}
