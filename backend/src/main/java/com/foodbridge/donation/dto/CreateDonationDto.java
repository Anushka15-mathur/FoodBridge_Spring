package com.foodbridge.donation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.foodbridge.donation.enums.FoodType;
import com.foodbridge.donation.enums.QuantityUnit;
import com.foodbridge.delivery.enums.FoodCondition;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateDonationDto {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private FoodType foodType;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal quantity;

    @NotNull
    private QuantityUnit quantityUnit;

    @NotNull
    @Min(1)
    private Integer estimatedMeals;

    @NotNull
    private LocalDateTime preparedAt;

    @NotNull
    private LocalDateTime expiryTime;

    @NotBlank
    private String pickupAddress;

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;

    private String specialInstructions;

    @NotNull
    private FoodCondition foodCondition;
}
