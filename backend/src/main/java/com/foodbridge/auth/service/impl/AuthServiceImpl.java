package com.foodbridge.auth.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.foodbridge.auth.dto.request.ForgotPasswordRequest;
import com.foodbridge.auth.dto.request.LoginRequest;
import com.foodbridge.auth.dto.request.RegisterRequest;
import com.foodbridge.auth.dto.request.ResetPasswordRequest;
import com.foodbridge.auth.dto.request.VerifyOtpRequest;
import com.foodbridge.auth.dto.response.AuthResponse;
import com.foodbridge.auth.dto.response.MessageResponse;
import com.foodbridge.auth.dto.response.UserInfoResponse;
import com.foodbridge.auth.service.AuthService;
import com.foodbridge.security.CustomUserDetails;
import com.foodbridge.security.JwtService;
import com.foodbridge.user.entity.User;
import com.foodbridge.user.enums.AccountStatus;
import com.foodbridge.user.repository.UserRepository;
import com.foodbridge.exception.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.foodbridge.user.dto.response.UserResponse;

import java.time.LocalDateTime;
import java.util.Random;
import java.security.SecureRandom;

import com.foodbridge.auth.entity.PasswordResetOtp;
import com.foodbridge.auth.repository.PasswordResetOtpRepository;
import com.foodbridge.email.service.EmailService;

@Service
public class AuthServiceImpl implements AuthService {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private JwtService jwtService;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Autowired
        private PasswordResetOtpRepository otpRepository;

        @Autowired
        private EmailService emailService;

        private static final SecureRandom RANDOM = new SecureRandom();

        @Override
        public AuthResponse register(RegisterRequest request) {

                if (userRepository.existsByEmail(request.getEmail())) {
                        throw new DuplicateResourceException("Email already exists.");
                }

                if (userRepository.existsByPhone(request.getPhone())) {
                        throw new DuplicateResourceException("Phone number already exists.");
                }

                User user = new User();

                user.setFirstName(request.getFirstName());
                user.setLastName(request.getLastName());
                user.setEmail(request.getEmail());

                user.setPassword(
                                passwordEncoder.encode(request.getPassword()));

                user.setPhone(request.getPhone());

                user.setRole(request.getRole());

                user.setStatus(AccountStatus.PENDING);

                userRepository.save(user);

                String token = jwtService.generateToken(
        new CustomUserDetails(user));

UserInfoResponse userInfo = UserInfoResponse.builder()
        .id(user.getId())
        .firstName(user.getFirstName())
        .lastName(user.getLastName())
        .email(user.getEmail())
        .role(user.getRole())
        .build();

return AuthResponse.builder()
        .token(token)
        .message("Registration successful. Please complete your profile.")
        .user(userInfo)
        .build();
        }

        @Override
        public AuthResponse login(LoginRequest request) {

                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                if (!passwordEncoder.matches(
                                request.getPassword(),
                                user.getPassword())) {

                        throw new UnauthorizedException("Invalid email or password.");
                }

                if (user.getStatus() != AccountStatus.APPROVED) {

                        return AuthResponse.builder()
                                        .token(null)
                                        .message("Account is not approved by Admin.")
                                        .user(null)
                                        .build();
                }

                String token = jwtService.generateToken(
                                new CustomUserDetails(user));

                UserInfoResponse userInfo = UserInfoResponse.builder()
                                .id(user.getId())
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .email(user.getEmail())
                                .role(user.getRole())
                                .build();

                return AuthResponse.builder()
                                .token(token)
                                .message("Login successful.")
                                .user(userInfo)
                                .build();
        }

        private String generateOtp() {
                return String.format("%06d", RANDOM.nextInt(1_000_000));
        }

        @Override
        public MessageResponse forgotPassword(ForgotPasswordRequest request) {

                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                otpRepository.findByUser(user)
                                .ifPresent(otpRepository::delete);

                String otp = generateOtp();

                PasswordResetOtp passwordResetOtp = PasswordResetOtp.builder()
                                .otp(otp)
                                .expiryTime(LocalDateTime.now().plusMinutes(10))
                                .verified(false)
                                .user(user)
                                .build();

                otpRepository.save(passwordResetOtp);

                emailService.sendOtpEmail(
                                user.getEmail(),
                                user.getFirstName(),
                                otp);

                return new MessageResponse(
                                "OTP sent successfully.");
        }

        @Override
        public MessageResponse verifyOtp(VerifyOtpRequest request) {

                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                PasswordResetOtp passwordResetOtp = otpRepository.findByUser(user)
                                .orElseThrow(() -> new ResourceNotFoundException("OTP not found."));

                if (passwordResetOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
                        throw new BadRequestException("OTP has expired.");
                }

                if (!passwordResetOtp.getOtp().equals(request.getOtp())) {
                        throw new BadRequestException("Invalid OTP.");
                }

                passwordResetOtp.setVerified(true);

                otpRepository.save(passwordResetOtp);

                return new MessageResponse("OTP verified successfully.");
        }

        @Override
        public MessageResponse resetPassword(ResetPasswordRequest request) {

                User user = userRepository.findByEmail(request.getEmail())
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                PasswordResetOtp passwordResetOtp = otpRepository.findByUser(user)
                                .orElseThrow(() -> new ResourceNotFoundException("OTP not found."));

                if (passwordResetOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
                        throw new BadRequestException("OTP has expired.");
                }

                if (!passwordResetOtp.isVerified()) {
                        throw new BadRequestException("OTP has not been verified.");
                }

                if (!passwordResetOtp.getOtp().equals(request.getOtp())) {
                        throw new BadRequestException("Invalid OTP.");
                }

                user.setPassword(
                                passwordEncoder.encode(request.getNewPassword()));

                userRepository.save(user);

                otpRepository.delete(passwordResetOtp);

                return new MessageResponse(
                                "Password reset successful.");
        }

        @Override
        public UserResponse getCurrentUser() {

                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

                User user = userRepository.findByEmail(userDetails.getUsername())
                                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

                UserResponse response = new UserResponse();

                response.setId(user.getId());
                response.setFirstName(user.getFirstName());
                response.setLastName(user.getLastName());
                response.setEmail(user.getEmail());
                response.setPhone(user.getPhone());
                response.setRole(user.getRole());
                response.setStatus(user.getStatus());

                return response;
        }

}