package com.foodbridge.auth.controller;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodbridge.auth.dto.request.LoginRequest;
import com.foodbridge.auth.dto.request.RegisterRequest;
import com.foodbridge.auth.dto.response.AuthResponse;
import com.foodbridge.user.dto.response.UserResponse;
import com.foodbridge.auth.dto.response.MessageResponse;
import com.foodbridge.auth.service.AuthService;
import com.foodbridge.auth.dto.request.ForgotPasswordRequest;
import com.foodbridge.auth.dto.request.VerifyOtpRequest;
import com.foodbridge.auth.dto.request.ResetPasswordRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

        private final AuthService authService;

        @PostMapping("/register")
        public ResponseEntity<AuthResponse> register(
                        @Valid @RequestBody RegisterRequest request) {

                return new ResponseEntity<>(
                                authService.register(request),
                                HttpStatus.CREATED);
        }

        @PostMapping("/login")
        public ResponseEntity<AuthResponse> login(
                        @Valid @RequestBody LoginRequest request) {

                return ResponseEntity.ok(authService.login(request));
        }

        @PostMapping("/forgot-password")
        public ResponseEntity<MessageResponse> forgotPassword(
                        @Valid @RequestBody ForgotPasswordRequest request) {

                return ResponseEntity.ok(
                                authService.forgotPassword(request));
        }

        @PostMapping("/verify-otp")
        public ResponseEntity<MessageResponse> verifyOtp(
                        @Valid @RequestBody VerifyOtpRequest request) {

                return ResponseEntity.ok(
                                authService.verifyOtp(request));
        }

        @PostMapping("/reset-password")
        public ResponseEntity<MessageResponse> resetPassword(
                        @Valid @RequestBody ResetPasswordRequest request) {

                return ResponseEntity.ok(
                                authService.resetPassword(request));
        }

        @GetMapping("/me")
        public ResponseEntity<UserResponse> getCurrentUser() {
                return ResponseEntity.ok(authService.getCurrentUser());
        }
}