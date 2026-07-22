package com.foodbridge.admin.dto;

import com.foodbridge.user.enums.AccountStatus;
import com.foodbridge.user.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserSummaryResponse {

    private Long id;

    private String fullName;

    private Role role;

    private AccountStatus status;
}