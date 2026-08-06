package com.foodbridge.ngo.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.foodbridge.delivery.enums.FoodCondition;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.donation.enums.FoodType;
import com.foodbridge.donation.enums.QuantityUnit;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonationDetailsResponse {

    private Long id;

    private String title;

    private String description;

    private String restaurantName;

    private FoodType foodType;

    private FoodCondition foodCondition;

    private BigDecimal quantity;

    private BigDecimal remainingQuantity;

    private QuantityUnit quantityUnit;

    private Integer estimatedMeals;

    private String pickupAddress;

    private LocalDateTime expiryTime;

    private String specialInstructions;

    private DonationStatus status;
}
