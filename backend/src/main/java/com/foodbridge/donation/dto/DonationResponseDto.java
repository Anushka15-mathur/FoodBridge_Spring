package com.foodbridge.donation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.foodbridge.donation.enums.FoodType;
import com.foodbridge.donation.enums.QuantityUnit;
import com.foodbridge.delivery.enums.FoodCondition;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonationResponseDto {

    private Long id;

    private String title;

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

    private String specialInstructions;

    private FoodCondition foodCondition;

    private List<String> imageUrls;
}
