package com.foodbridge.donation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.foodbridge.delivery.enums.FoodCondition;
import com.foodbridge.donation.enums.FoodType;
import com.foodbridge.donation.enums.QuantityUnit;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateDonationRequest {

    @NotBlank(message = "Food name is required")
    private String foodName;

    private String description;

    @NotNull(message = "Food type is required")
    private FoodType foodType;

    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.01", message = "Quantity must be greater than zero")
    private BigDecimal quantity;

    @NotNull(message = "Quantity unit is required")
    private QuantityUnit quantityUnit;

    @NotNull(message = "Estimated meals is required")
    @Min(value = 1, message = "Estimated meals must be at least 1")
    private Integer estimatedMeals;

    private LocalDateTime preparedAt;

    @NotNull(message = "Expiry time is required")
    private LocalDateTime expiryTime;

    @NotBlank(message = "Pickup address is required")
    private String pickupAddress;

    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private Double latitude;

    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private Double longitude;

    private String placeId;
    private String specialInstructions;

    @NotNull(message = "Food condition is required")
    private FoodCondition foodCondition;
}
