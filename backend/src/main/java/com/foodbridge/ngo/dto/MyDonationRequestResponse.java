package com.foodbridge.ngo.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.foodbridge.allocation.enums.DonationRequestStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyDonationRequestResponse {

    private Long requestId;

    private Long donationId;

    private String donationTitle;

    private String restaurantName;

    private BigDecimal requestedQuantity;

    private DonationRequestStatus status;

    private LocalDateTime requestedAt;
}