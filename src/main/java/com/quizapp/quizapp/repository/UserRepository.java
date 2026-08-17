package com.quizapp.quizapp.repository;

import com.quizapp.quizapp.entity.User;
import com.quizapp.quizapp.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByRole(Role role);
}
