package com.quizapp.quizapp.service;

import com.quizapp.quizapp.dto.request.UserRegistrationRequest;
import com.quizapp.quizapp.dto.response.UserResponse;
import com.quizapp.quizapp.entity.Role;
import com.quizapp.quizapp.entity.User;
import com.quizapp.quizapp.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.*;

@Service

public class UserService {
    private UserRepository userRepo;
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public List<UserResponse> getAllUsers() {
        List<User> users = userRepo.findAll();
        List<UserResponse> userResponses = new ArrayList<>();
        for(User user : users) {
            UserResponse response = UserResponse.builder()
                                    .id(user.getId())
                                    .name(user.getName())
                                    .email(user.getEmail())
                                    .role(user.getRole())
                                    .build();
            userResponses.add(response);
        }
        return userResponses;
    }

    public UserResponse registerUser(UserRegistrationRequest request) {
        if(userRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(request.getPassword())
                    .role(Role.USER)
                    .build();

        User savedUser = userRepo.save(user);

        return UserResponse.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .build();
    }
}
