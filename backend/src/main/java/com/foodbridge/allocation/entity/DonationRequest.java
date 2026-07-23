package com.foodbridge.allocation.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.foodbridge.common.entity.BaseEntity;
import com.foodbridge.allocation.enums.DonationRequestStatus;
import com.foodbridge.donation.entity.FoodDonation;
import com.foodbridge.ngo.entity.Ngo;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "donation_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonationRequest extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_id", nullable = false)
    @NotNull(message = "Donation is required")
    private FoodDonation donation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ngo_id", nullable = false)
    @NotNull(message = "NGO is required")
    private Ngo ngo;

    @DecimalMin(value = "0.01")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal requestedQuantity;

    @Column(length = 500)
    private String requestMessage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private DonationRequestStatus status = DonationRequestStatus.PENDING;

    @Column(nullable = false)
    private LocalDateTime requestedAt;

    @PrePersist
    protected void onRequest() {
        this.requestedAt = LocalDateTime.now();
    }
}
