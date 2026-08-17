package com.quizapp.quizapp.repository;

import com.quizapp.quizapp.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;


public interface CategoryRepository extends JpaRepository<Category, Integer> {

    Optional<Category> findByName(String name);
    boolean existsByName(String name);
}
