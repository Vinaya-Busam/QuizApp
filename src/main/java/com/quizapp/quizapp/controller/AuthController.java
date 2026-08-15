package com.quizapp.quizapp.controller;

import com.quizapp.quizapp.dto.request.LoginRequest;
import com.quizapp.quizapp.dto.response.LoginResponse;
import com.quizapp.quizapp.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = userService.loginUser(request);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }
}
