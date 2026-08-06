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
public class DonorMonthlyDonationResponse {

    private int year;

    private int month;

    private String label;

    private long foodCount;

    private long moneyCount;

    private long clothCount;

    private long totalCount;

    private BigDecimal totalAmount;
}
