package com.foodbridge.donor.entity;

import com.foodbridge.common.entity.BaseEntity;
import com.foodbridge.donation.enums.QuantityUnit;
import com.foodbridge.donor.enums.DonorDonationStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(
        name = "donor_food_donations",
        indexes = {
                @Index(name = "idx_donor_food_donation_donor", columnList = "donor_id"),
                @Index(name = "idx_donor_food_donation_status", columnList = "status")
        })
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonorFoodDonation extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id", nullable = false)
    @NotNull(message = "Donor is required")
    private Donor donor;

    @Column(name = "food_name", nullable = false, length = 150)
    @NotBlank(message = "Food name is required")
    private String foodName;

    @Column(nullable = false, precision = 10, scale = 2)
    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.01", message = "Quantity must be greater than zero")
    private BigDecimal quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "unit", nullable = false, length = 20)
    @NotNull(message = "Unit is required")
    private QuantityUnit unit;

    @Column(name = "fresh_until", nullable = false)
    @NotNull(message = "Fresh until date and time is required")
    private LocalDateTime freshUntil;

    @Column(name = "pickup_address", nullable = false, length = 255)
    @NotBlank(message = "Pickup address is required")
    private String pickupAddress;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private DonorDonationStatus status = DonorDonationStatus.PENDING;

    @Column(name = "is_deleted", nullable = false)
    @Builder.Default
    private Boolean isDeleted = false;
}
