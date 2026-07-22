package com.foodbridge.admin.service;

import com.foodbridge.admin.dto.AdminUserDetailsResponse;
import com.foodbridge.admin.dto.AdminUserSummaryResponse;
import com.foodbridge.admin.dto.DashboardResponse;
import com.foodbridge.common.dto.PageResponse;
import com.foodbridge.user.enums.AccountStatus;
import com.foodbridge.user.enums.Role;

public interface AdminService {

    PageResponse<AdminUserSummaryResponse> getAllUsers(int page, int size);

    AdminUserDetailsResponse getUserById(Long id);

    PageResponse<AdminUserSummaryResponse> getPendingUsers(int page, int size);

    void approveUser(Long id);

    void rejectUser(Long id);

    void suspendUser(Long id);
    
    DashboardResponse getDashboard();
    
    PageResponse<AdminUserSummaryResponse> searchUsers(
            String keyword,
            int page,
            int size);
    
    PageResponse<AdminUserSummaryResponse> filterUsersByRole(
            Role role,
            int page,
            int size);

    PageResponse<AdminUserSummaryResponse> filterUsersByStatus(
            AccountStatus status,
            int page,
            int size);
}