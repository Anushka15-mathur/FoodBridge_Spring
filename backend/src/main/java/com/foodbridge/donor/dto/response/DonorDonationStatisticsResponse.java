package com.foodbridge.donor.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonorDonationStatisticsResponse {

    private long pendingCount;

    private long scheduledCount;

    private long pickedUpCount;

    private long completedCount;

    private long cancelledCount;

    private double foodPercentage;

    private double moneyPercentage;

    private double clothPercentage;

    private BigDecimal totalAmountDonated;

    private BigDecimal totalFoodQuantity;

    private long totalClothPieces;
}
