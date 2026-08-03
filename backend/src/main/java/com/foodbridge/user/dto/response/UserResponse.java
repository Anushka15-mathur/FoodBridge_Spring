package com.foodbridge.user.dto.response;

import com.foodbridge.user.enums.AccountStatus;
import com.foodbridge.user.enums.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Role role;
    private AccountStatus status;
    private boolean profileCompleted;
}
