package com.foodbridge.donation.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.foodbridge.common.entity.BaseEntity;
import com.foodbridge.delivery.enums.FoodCondition;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.donation.enums.FoodType;
import com.foodbridge.donation.enums.QuantityUnit;
import com.foodbridge.restaurant.entity.Restaurant;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "food_donations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodDonation extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id", nullable = false)
    @NotNull
    private Restaurant restaurant;

    @Column(nullable = false, length = 150)
    @NotBlank
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FoodType foodType;

    @Column(nullable = false, precision = 10, scale = 2)
    @DecimalMin(value = "0.01")
    @NotNull
    private BigDecimal quantity;

    @Column(nullable = false, precision = 10, scale = 2)
    @DecimalMin(value = "0.00")
    @NotNull
    private BigDecimal remainingQuantity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuantityUnit quantityUnit;

    @Column(nullable = false)
    @Min(1)
    private Integer estimatedMeals;

    @Column(nullable = false)
    private LocalDateTime preparedAt;

    @Column(nullable = false)
    private LocalDateTime expiryTime;

    @Column(nullable = false)
    private String pickupAddress;

    @Column(nullable = false)
    @DecimalMin("-90.0")
    @DecimalMax("90.0")
    private Double latitude;

    @Column(nullable = false)
    @DecimalMin("-180.0")
    @DecimalMax("180.0")
    private Double longitude;

    @Column(length = 255)
    private String placeId;

    @Column(columnDefinition = "TEXT")
    private String specialInstructions;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private DonationStatus status = DonationStatus.AVAILABLE;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isDeleted = false;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FoodCondition foodCondition;
    
    @OneToMany(
            mappedBy = "donation",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY)
    @Builder.Default
    private List<DonationImage> images = new ArrayList<>();
    
    @PrePersist
    private void initializeRemainingQuantity() {
        if (remainingQuantity == null) {
            remainingQuantity = quantity;
        }
    }
    
}