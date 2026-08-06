package com.foodbridge.donor.dto.response;

import com.foodbridge.donor.enums.DonorDonationStatus;
import com.foodbridge.donor.enums.DonorDonationType;
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
public class DonorRecentDonationResponse {
    private Long id;

    private DonorDonationType type;

    private String title;

    private String quantityLabel;

    private BigDecimal amount;

    private DonorDonationStatus status;

    private LocalDateTime createdAt;
}
