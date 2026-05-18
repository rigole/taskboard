package com.taskboardbackend.taskboardbackend.controller;


import com.taskboardbackend.taskboardbackend.dto.request.LoginRequest;
import com.taskboardbackend.taskboardbackend.dto.request.RegisterRequest;
import com.taskboardbackend.taskboardbackend.dto.response.AuthResponse;
import com.taskboardbackend.taskboardbackend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        System.out.println("Register request: " + registerRequest);
        return ResponseEntity.ok(authService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        System.out.println("Login request: " + loginRequest);
        return ResponseEntity.ok(authService.login(loginRequest));
    }
}
