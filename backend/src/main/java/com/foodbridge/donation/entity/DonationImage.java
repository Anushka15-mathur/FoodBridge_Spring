package com.foodbridge.donation.entity;

import com.foodbridge.common.entity.BaseEntity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "donation_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonationImage extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_id", nullable = false)
    @NotNull(message = "Donation is required")
    private FoodDonation donation;

    @Column(nullable = false)
    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    @Column(nullable = false)
    @Builder.Default
    private Boolean primaryImage = false;
}