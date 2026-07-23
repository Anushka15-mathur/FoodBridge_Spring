package com.foodbridge.allocation.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.foodbridge.common.entity.BaseEntity;
import com.foodbridge.allocation.enums.AllocationStatus;
import com.foodbridge.user.entity.User;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "donation_allocations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonationAllocation extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id", nullable = false, unique = true)
    @NotNull(message = "Donation request is required")
    private DonationRequest donationRequest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "allocated_by", nullable = false)
    @NotNull(message = "Admin is required")
    private User allocatedBy;

    @Column(nullable = false, precision = 10, scale = 2)
    @DecimalMin(value = "0.01")
    @NotNull(message = "Allocated quantity is required")
    private BigDecimal allocatedQuantity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private AllocationStatus status = AllocationStatus.PENDING;

    @Column(length = 500)
    private String adminRemarks;

    @Column(nullable = false)
    private LocalDateTime allocatedAt;

    @PrePersist
    private void onAllocate() {
        allocatedAt = LocalDateTime.now();
    }
}