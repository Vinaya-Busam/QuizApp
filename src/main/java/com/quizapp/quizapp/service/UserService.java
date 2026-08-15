package com.quizapp.quizapp.service;

import com.quizapp.quizapp.dto.request.LoginRequest;
import com.quizapp.quizapp.dto.request.UserRegistrationRequest;
import com.quizapp.quizapp.dto.response.LoginResponse;
import com.quizapp.quizapp.dto.response.UserResponse;
import com.quizapp.quizapp.entity.Role;
import com.quizapp.quizapp.entity.User;
import com.quizapp.quizapp.repository.UserRepository;
import com.quizapp.quizapp.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UserService {
    private UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private JwtService jwtService;
    public UserService(UserRepository userRepo, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // Get all users
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


    // User registration 
    public UserResponse registerUser(UserRegistrationRequest request) {
        if(userRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
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


    // User Login
    public LoginResponse loginUser(LoginRequest request) {
        User user = userRepo.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Invalid Email or Password"));
        
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return LoginResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .token(token)
                .role(user.getRole())
                .message("Login Successful")
                .build();
    }
}
