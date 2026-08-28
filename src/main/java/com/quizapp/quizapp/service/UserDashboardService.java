package com.quizapp.quizapp.service;

import com.quizapp.quizapp.dto.response.UserDashboardResponse;
import com.quizapp.quizapp.repository.QuestionRepository;
import com.quizapp.quizapp.entity.User;
import com.quizapp.quizapp.repository.QuizAttemptRepository;
import com.quizapp.quizapp.repository.QuizRepository;
import com.quizapp.quizapp.repository.UserRepository;
import com.quizapp.quizapp.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class UserDashboardService {

    private final UserRepository userRepo;
    private final QuizAttemptRepository quizAttemptRepo;
    public UserDashboardService(UserRepository userRepo, QuizAttemptRepository quizAttemptRepo) {
        this.userRepo = userRepo;
        this.quizAttemptRepo = quizAttemptRepo;
    }

    public UserDashboardResponse getDashboard(String email) {
        // Find authenticated user
        User user = userRepo.findByEmail(email).orElseThrow(() -> 
                                                        new ResourceNotFoundException("User not found"));

        Integer userId = user.getId();

        // Get user's statistics
        long quizzesAttempted = quizAttemptRepo.countByUserId(userId);
        Long totalQuestions = quizAttemptRepo.getTotalQuestionsByUserId(userId);
        Long correctAnswers =quizAttemptRepo.getCorrectAnswersByUserId(userId);
        Long wrongAnswers = quizAttemptRepo.getWrongAnswersByUserId(userId);
        Double averageScore = quizAttemptRepo.getAverageScoreByUserId(userId);
        Double bestScore = quizAttemptRepo.getBestScoreByUserId(userId);

        // Return dashboard
        return UserDashboardResponse.builder()
                        .quizzesAttempted(quizzesAttempted)
                        .totalQuestions(totalQuestions)
                        .correctAnswers(correctAnswers)
                        .wrongAnswers(wrongAnswers)
                        .averageScore(round(averageScore))
                        .bestScore(round(bestScore))
                        .build();

    }

    private Double round(Double value) {
        if (value == null) {
            return 0.0;
        }
        return Math.round(value * 100.0) / 100.0;
    }
}
