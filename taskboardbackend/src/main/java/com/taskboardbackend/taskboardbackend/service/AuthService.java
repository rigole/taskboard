package com.taskboardbackend.taskboardbackend.service;

import com.taskboardbackend.taskboardbackend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtService jwtService;



}
