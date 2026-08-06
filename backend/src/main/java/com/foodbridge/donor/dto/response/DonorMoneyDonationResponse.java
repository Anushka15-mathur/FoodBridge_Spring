package com.foodbridge.donor.dto.response;

import com.foodbridge.donor.enums.DonorDonationStatus;
import com.foodbridge.donor.enums.PaymentMode;
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
public class DonorMoneyDonationResponse {

    private Long id;

    private Long donorId;

    private BigDecimal amount;

    private PaymentMode paymentMode;

    private String transactionReference;

    private String description;

    private DonorDonationStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
