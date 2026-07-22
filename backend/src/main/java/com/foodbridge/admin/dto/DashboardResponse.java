package com.foodbridge.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    private long totalUsers;

    private long pendingUsers;

    private long approvedUsers;

    private long rejectedUsers;

    private long suspendedUsers;

    private long totalAdmins;

    private long totalRestaurants;

    private long totalNGOs;

    private long totalDonors;

    private long totalVolunteers;
}
