package com.foodbridge.auth.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.foodbridge.auth.dto.request.LoginRequest;
import com.foodbridge.auth.dto.request.RegisterRequest;
import com.foodbridge.auth.dto.response.AuthResponse;
import com.foodbridge.auth.dto.response.MessageResponse;
import com.foodbridge.auth.service.AuthService;
import com.foodbridge.security.CustomUserDetails;
import com.foodbridge.security.JwtService;
import com.foodbridge.user.entity.User;
import com.foodbridge.user.enums.AccountStatus;
import com.foodbridge.user.repository.UserRepository;
import com.foodbridge.exception.*;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public MessageResponse register(RegisterRequest request) {

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

        return new MessageResponse(
                "Registration successful. Waiting for admin approval.");
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

            return new AuthResponse(
                    null,
                    "Account is not approved by Admin.");
        }

        String token = jwtService.generateToken(
                new CustomUserDetails(user));

        return new AuthResponse(
                token,
                "Login successful.");
    }

}