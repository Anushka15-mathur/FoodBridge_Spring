package com.foodbridge.allocation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.foodbridge.allocation.enums.DonationRequestStatus;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonationRequestAdminResponse {
    private Long requestId;
    private Long donationId;
    private String donationTitle;
    private String restaurantName;
    private String ngoName;
    private BigDecimal requestedQuantity;
    private DonationRequestStatus status;
    private LocalDateTime requestedAt;
}
