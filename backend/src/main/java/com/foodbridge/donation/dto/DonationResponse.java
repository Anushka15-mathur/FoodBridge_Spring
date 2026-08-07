package com.foodbridge.donation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.foodbridge.delivery.enums.FoodCondition;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.donation.enums.FoodType;
import com.foodbridge.donation.enums.QuantityUnit;
import com.foodbridge.donation.enums.DonationType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonationResponse {

    private Long id;
    private DonationType donationType;
    private String ownerType;
    private String ownerName;
    private BigDecimal amount;
    private String currency;
    private String donationPurpose;
    private String foodName;
    private String description;
    private FoodType foodType;
    private BigDecimal quantity;
    private BigDecimal remainingQuantity;
    private QuantityUnit quantityUnit;
    private Integer estimatedMeals;
    private LocalDateTime preparedAt;
    private LocalDateTime expiryTime;
    private String pickupAddress;
    private Double latitude;
    private Double longitude;
    private String placeId;
    private String specialInstructions;
    private FoodCondition foodCondition;
    private DonationStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
