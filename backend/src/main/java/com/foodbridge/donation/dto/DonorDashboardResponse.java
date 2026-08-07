package com.foodbridge.donation.dto;

import java.util.List;
import java.math.BigDecimal;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DonorDashboardResponse {
    private long totalDonations;
    private long totalFoodDonations;
    private long totalMoneyDonations;
    private BigDecimal totalAmountDonated;
    private long totalMealsDonated;
    private List<DonationResponse> recentDonations;
}
