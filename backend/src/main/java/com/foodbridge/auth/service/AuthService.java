package com.foodbridge.auth.service;

import com.foodbridge.auth.dto.request.ForgotPasswordRequest;
import com.foodbridge.auth.dto.request.LoginRequest;
import com.foodbridge.auth.dto.request.RegisterRequest;
import com.foodbridge.auth.dto.request.ResetPasswordRequest;
import com.foodbridge.auth.dto.request.VerifyOtpRequest;
import com.foodbridge.auth.dto.response.AuthResponse;
import com.foodbridge.user.dto.response.UserResponse;
import com.foodbridge.auth.dto.response.MessageResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest loginRequest);

    UserResponse getCurrentUser();

    MessageResponse forgotPassword(ForgotPasswordRequest request);

    MessageResponse verifyOtp(VerifyOtpRequest request);

    MessageResponse resetPassword(ResetPasswordRequest request);

}