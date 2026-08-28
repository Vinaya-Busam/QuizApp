package com.quizapp.quizapp.controller;

import com.quizapp.quizapp.dto.response.UserDashboardResponse;
import com.quizapp.quizapp.service.UserDashboardService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@SecurityRequirement(name = "bearerAuth")
public class UserDashboardController {

    private UserDashboardService userDashboardService;
    public UserDashboardController(UserDashboardService userDashboardService) {
        this.userDashboardService = userDashboardService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<UserDashboardResponse> getDashboard(Authentication authentication) {
        return ResponseEntity.ok(userDashboardService.getDashboard(authentication.getName()));
    }
}
