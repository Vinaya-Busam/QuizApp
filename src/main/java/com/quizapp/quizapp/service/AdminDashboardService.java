package com.quizapp.quizapp.service;

import com.quizapp.quizapp.dto.response.AdminDashboardResponse;
import com.quizapp.quizapp.repository.QuestionRepository;
import com.quizapp.quizapp.repository.QuizAttemptRepository;
import com.quizapp.quizapp.repository.QuizRepository;
import com.quizapp.quizapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class AdminDashboardService {

    private final UserRepository userRepo;
    private final QuizRepository quizRepo;
    private final QuestionRepository questionRepo;
    private final QuizAttemptRepository quizAttemptRepo;
    public AdminDashboardService(UserRepository userRepo, QuizRepository quizRepo, 
                                QuestionRepository questionRepo, QuizAttemptRepository quizAttemptRepo) {
        this.userRepo = userRepo;
        this.quizRepo = quizRepo;
        this.questionRepo = questionRepo;
        this.quizAttemptRepo = quizAttemptRepo;
    }

    public AdminDashboardResponse getDashboard() {
        long totalUsers = userRepo.count();
        long totalQuizzes = quizRepo.count();
        long totalQuestions = questionRepo.count();
        long totalAttempts = quizAttemptRepo.count();

        Double averageScore = quizAttemptRepo.findAveragePercentage();

        if(averageScore == null) {
            averageScore = 0.0;
        }

        return AdminDashboardResponse.builder()
                                    .totalUsers(totalUsers)
                                    .totalQuizzes(totalQuizzes)
                                    .totalQuestions(totalQuestions)
                                    .totalAttempts(totalAttempts)
                                    .averageScore(Math.round(averageScore * 100.0) / 100.0)
                                    .build();
    }
}
