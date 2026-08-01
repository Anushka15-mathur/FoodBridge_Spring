package com.foodbridge.restaurant.dto;

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
public class RestaurantRequestResponse {

    private Long requestId;

    private Long donationId;

    private String donationTitle;

    private String ngoName;

    private BigDecimal requestedQuantity;

    private String requestMessage;

    private DonationRequestStatus status;

    private LocalDateTime requestedAt;
}