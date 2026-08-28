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

    @Query("""
        SELECT COALESCE(SUM(a.totalQuestions), 0)
        FROM QuizAttempt a
        WHERE a.user.id = :userId
        """)
    Long getTotalQuestionsByUserId(Integer userId);

    @Query("""
        SELECT COALESCE(SUM(a.correctAnswers), 0)
        FROM QuizAttempt a
        WHERE a.user.id = :userId
        """)
    Long getCorrectAnswersByUserId(Integer userId);

    @Query("""
        SELECT COALESCE(SUM(a.wrongAnswers), 0)
        FROM QuizAttempt a
        WHERE a.user.id = :userId
        """)
    Long getWrongAnswersByUserId(Integer userId);

    @Query("""
        SELECT COALESCE(AVG(a.percentage), 0)
        FROM QuizAttempt a
        WHERE a.user.id = :userId
        """)
    Double getAverageScoreByUserId(Integer userId);

    @Query("""
        SELECT COALESCE(MAX(a.percentage), 0)
        FROM QuizAttempt a
        WHERE a.user.id = :userId
        """)
    Double getBestScoreByUserId(Integer userId);

    long countByUserId(Integer userId);
}
