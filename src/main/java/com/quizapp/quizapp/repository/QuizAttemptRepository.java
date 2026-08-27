package com.quizapp.quizapp.repository;

import com.quizapp.quizapp.entity.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Integer> {

    List<QuizAttempt> findByUserIdOrderByAttemptedAtDesc(Integer userId);
    List<QuizAttempt> findByQuizIdOrderByAttemptedAtDesc(Integer quizId);

    @Query("SELECT AVG(q.percentage) FROM QuizAttempt q")
    Double findAveragePercentage();
}
