package com.foodbridge.delivery.entity;

import java.time.LocalDateTime;

import com.foodbridge.allocation.entity.DonationAllocation;
import com.foodbridge.common.entity.BaseEntity;
import com.foodbridge.delivery.enums.DeliveryStatus;
import com.foodbridge.volunteer.entity.Volunteer;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "deliveries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Delivery extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "allocation_id", nullable = false, unique = true)
    @NotNull(message = "Allocation is required")
    private DonationAllocation allocation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "volunteer_id", nullable = false)
    @NotNull(message = "Volunteer is required")
    private Volunteer volunteer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private DeliveryStatus status = DeliveryStatus.ASSIGNED;

    @Column
    private LocalDateTime assignedAt;

    @Column
    private LocalDateTime pickupTime;

    @Column
    private LocalDateTime deliveredTime;

    @Column(length = 500)
    private String deliveryRemarks;

    @Column(length = 6)
    private String pickupOtp;

    @Column(length = 6)
    private String deliveryOtp;
    
    @Column
    private LocalDateTime pickupOtpExpiry;

    @Column
    private LocalDateTime deliveryOtpExpiry;

    @Column(nullable = false)
    @Builder.Default
    private Boolean pickupVerified = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean deliveryVerified = false;

    @PrePersist
    private void onAssign() {
        assignedAt = LocalDateTime.now();
    }
}