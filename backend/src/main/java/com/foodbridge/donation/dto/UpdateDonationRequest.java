package com.foodbridge.donation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.foodbridge.delivery.enums.FoodCondition;
import com.foodbridge.donation.enums.FoodType;
import com.foodbridge.donation.enums.QuantityUnit;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateDonationRequest {

    private String foodName;
    private String description;
    private FoodType foodType;

    @DecimalMin(value = "0.01", message = "Quantity must be greater than zero")
    private BigDecimal quantity;

    private QuantityUnit quantityUnit;

    @Min(value = 1, message = "Estimated meals must be at least 1")
    private Integer estimatedMeals;

    private LocalDateTime preparedAt;
    private LocalDateTime expiryTime;
    private String pickupAddress;

    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private Double latitude;

    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private Double longitude;

    private String placeId;
    private String specialInstructions;
    private FoodCondition foodCondition;
}
