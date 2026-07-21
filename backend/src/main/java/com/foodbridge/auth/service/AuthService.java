package com.foodbridge.auth.service;

import com.foodbridge.auth.dto.request.LoginRequest;
import com.foodbridge.auth.dto.request.RegisterRequest;
import com.foodbridge.auth.dto.response.AuthResponse;
import com.foodbridge.auth.dto.response.MessageResponse;

public interface AuthService {

    MessageResponse register(RegisterRequest registerRequest);

    AuthResponse login(LoginRequest loginRequest);

}