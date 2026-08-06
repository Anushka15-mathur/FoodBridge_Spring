package com.foodbridge.donor.entity;

import com.foodbridge.common.entity.BaseEntity;
import com.foodbridge.donor.enums.DonorDonationStatus;
import com.foodbridge.donor.enums.PaymentMode;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(
        name = "donor_money_donations",
        indexes = {
                @Index(name = "idx_donor_money_donation_donor", columnList = "donor_id"),
                @Index(name = "idx_donor_money_donation_status", columnList = "status")
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DonorMoneyDonation extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id", nullable = false)
    @NotNull(message = "Donor is required")
    private Donor donor;

    @Column(name = "amount", nullable = false, precision = 12, scale = 2)
    @NotNull(message = "Amount is required")
    @DecimalMin(value = "1.00", message = "Amount must be at least 1")
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_mode", nullable = false, length = 20)
    @NotNull(message = "Payment mode is required")
    private PaymentMode paymentMode;

    @Column(name = "transaction_reference", length = 100)
    private String transactionReference;

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
