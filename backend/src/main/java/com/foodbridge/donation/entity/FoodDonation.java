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
import com.foodbridge.donor.entity.Donor;
import com.foodbridge.donation.enums.DonationType;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.Check;

@Entity
@Table(name = "food_donations")
@Check(constraints = "(restaurant_id is not null and donor_id is null) or (restaurant_id is null and donor_id is not null)")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodDonation extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurant_id")
    private Restaurant restaurant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id")
    private Donor donor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "varchar(20) not null default 'FOOD'")
    @Builder.Default
    private DonationType donationType = DonationType.FOOD;

    @Column(precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(length = 3)
    @Builder.Default
    private String currency = "INR";

    @Column(length = 255)
    private String donationPurpose;

    @Column(length = 150)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column
    private FoodType foodType;

    @Column(precision = 10, scale = 2)
    private BigDecimal quantity;

    @Column(precision = 10, scale = 2)
    private BigDecimal remainingQuantity;

    @Enumerated(EnumType.STRING)
    @Column
    private QuantityUnit quantityUnit;

    @Column
    private Integer estimatedMeals;

    @Column
    private LocalDateTime preparedAt;

    @Column
    private LocalDateTime expiryTime;

    @Column
    private String pickupAddress;

    @Column
    @DecimalMin("-90.0")
    @DecimalMax("90.0")
    private Double latitude;

    @Column
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
    @Column
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
