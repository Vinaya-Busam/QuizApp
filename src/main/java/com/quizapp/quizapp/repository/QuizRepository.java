package com.quizapp.quizapp.repository;

import com.quizapp.quizapp.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Integer> {

    List<Quiz> findByCategoryId(Integer categoryId);
    boolean existsByTitleAndCategoryId(String title, Integer categoryId);
}
