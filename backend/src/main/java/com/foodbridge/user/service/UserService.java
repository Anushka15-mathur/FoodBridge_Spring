package com.foodbridge.user.service;

import java.util.List;

import com.foodbridge.user.dto.response.UserResponse;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Long id);

}