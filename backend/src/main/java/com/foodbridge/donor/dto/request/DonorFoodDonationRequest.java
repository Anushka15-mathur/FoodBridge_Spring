package com.foodbridge.donor.dto.request;

import com.foodbridge.donation.enums.QuantityUnit;
import com.foodbridge.donor.enums.DonorDonationStatus;
import jakarta.validation.constraints.*;
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
public class DonorFoodDonationRequest {
    @NotBlank(message = "Food name is required")
    @Size(max = 150, message = "Food name must not exceed 150 characters")
    private String foodName;

    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.01", message = "Quantity must be greater than zero")
    @Digits(integer = 8, fraction = 2,
            message = "Quantity must have at most 8 digits and 2 decimals")
    private BigDecimal quantity;

    @NotNull(message = "Unit is required")
    private QuantityUnit unit;

    @NotNull(message = "Fresh until date and time is required")
    @Future(message = "Fresh until must be a future date and time")
    private LocalDateTime freshUntil;

    @NotBlank(message = "Pickup address is required")
    @Size(max = 255, message = "Pickup address must not exceed 255 characters")
    private String pickupAddress;

    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;

    private DonorDonationStatus status;
}
