package com.foodbridge.user.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.foodbridge.user.dto.response.UserResponse;
import com.foodbridge.user.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Override
    public List<UserResponse> getAllUsers() {

        return List.of();
    }

    @Override
    public UserResponse getUserById(Long id) {

        return null;
    }

}