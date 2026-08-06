package com.foodbridge.donor.entity;

import com.foodbridge.common.entity.BaseEntity;
import com.foodbridge.donor.enums.ClothCategory;
import com.foodbridge.donor.enums.ClothCondition;
import com.foodbridge.donor.enums.DonorDonationStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "donor_cloth_donations",
        indexes = {
                @Index(name = "idx_donor_cloth_donation_donor", columnList = "donor_id"),
                @Index(name = "idx_donor_cloth_donation_status", columnList = "status")
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonorClothDonation extends BaseEntity {


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id", nullable = false)
    @NotNull(message = "Donor is required")
    private Donor donor;

    @Column(name = "cloth_type", nullable = false, length = 100)
    @NotBlank(message = "Cloth type is required")
    private String clothType;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false, length = 20)
    @NotNull(message = "Category is required")
    private ClothCategory category;

    @Column(name = "quantity", nullable = false)
    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "cloth_condition", nullable = false, length = 20)
    @NotNull(message = "Condition is required")
    private ClothCondition clothCondition;

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
