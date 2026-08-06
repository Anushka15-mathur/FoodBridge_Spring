package com.foodbridge.donor.dto.request;

import com.foodbridge.donor.enums.DonorDonationStatus;
import com.foodbridge.donor.enums.PaymentMode;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonorMoneyDonationRequest {

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "1.00", message = "Amount must be at least 1")
    @Digits(integer = 10, fraction = 2,
            message = "Amount must have at most 10 digits and 2 decimals")
    private BigDecimal amount;

    @NotNull(message = "Payment mode is required")
    private PaymentMode paymentMode;

    @Size(max = 100,
            message = "Transaction reference must not exceed 100 characters")
    private String transactionReference;

    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;

    private DonorDonationStatus status;
}
