package com.quizapp.quizapp.dto.response;

import com.quizapp.quizapp.entity.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder 
public class LoginResponse {
    private Integer id;
    private String name;
    private String email;
    private Role role;
    private String token;
    private String message;
}
