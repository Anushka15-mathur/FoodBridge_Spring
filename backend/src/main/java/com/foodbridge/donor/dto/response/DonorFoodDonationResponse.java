package com.foodbridge.donor.dto.response;


import com.foodbridge.donation.enums.QuantityUnit;
import com.foodbridge.donor.enums.DonorDonationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonorFoodDonationResponse {

    private Long id;

    private Long donorId;

    private String foodName;

    private BigDecimal quantity;

    private QuantityUnit unit;

    private LocalDateTime freshUntil;

    private String pickupAddress;

    private String description;

    private DonorDonationStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
