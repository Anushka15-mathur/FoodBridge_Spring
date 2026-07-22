package com.foodbridge.admin.dto;

import com.foodbridge.user.enums.AccountStatus;
import com.foodbridge.user.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserDetailsResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private Role role;

    private AccountStatus status;

    private boolean profileCompleted;

    private LocalDateTime createdAt;
}