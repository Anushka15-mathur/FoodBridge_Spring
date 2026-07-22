package com.foodbridge.admin.service;

import com.foodbridge.admin.dto.AdminUserDetailsResponse;
import com.foodbridge.admin.dto.AdminUserSummaryResponse;
import com.foodbridge.common.dto.PageResponse;

public interface AdminService {

    PageResponse<AdminUserSummaryResponse> getAllUsers(int page, int size);

    AdminUserDetailsResponse getUserById(Long id);

    PageResponse<AdminUserSummaryResponse> getPendingUsers(int page, int size);

    void approveUser(Long id);

    void rejectUser(Long id);

    void suspendUser(Long id);
}