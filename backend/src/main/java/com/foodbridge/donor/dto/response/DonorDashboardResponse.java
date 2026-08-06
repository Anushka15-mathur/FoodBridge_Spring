package com.foodbridge.donor.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonorDashboardResponse {

    private String donorName;

    private long totalDonations;

    private long foodDonations;

    private long moneyDonations;

    private long clothDonations;

    private long activeDonations;

    private long completedDonations;

    private long pendingPickups;

    private List<DonorRecentDonationResponse> recentDonations;

    private DonorDonationStatisticsResponse statistics;

    private List<DonorMonthlyDonationResponse> monthlyChart;
}
