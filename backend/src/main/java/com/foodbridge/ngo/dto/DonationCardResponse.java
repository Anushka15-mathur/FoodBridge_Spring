package com.foodbridge.ngo.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.foodbridge.donation.enums.FoodType;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.donation.enums.QuantityUnit;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonationCardResponse {

    private Long id;

    private String title;

    private String restaurantName;

    private Integer estimatedMeals;

    private BigDecimal quantity;

    private BigDecimal remainingQuantity;

    private QuantityUnit quantityUnit;

    private FoodType foodType;

    private String pickupAddress;

    private LocalDateTime expiryTime;

    private DonationStatus status;
}
