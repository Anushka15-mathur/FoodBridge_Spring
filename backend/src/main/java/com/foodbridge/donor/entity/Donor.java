package com.foodbridge.donor.entity;

import com.foodbridge.common.entity.BaseEntity;
import com.foodbridge.user.entity.User;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "donors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Donor extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @NotNull(message = "Donor user is required")
    private User user;

    @Column(nullable = false)
    @Builder.Default
    private Boolean organization = false;

    @Column(length = 200)
    private String organizationName;

    @Column(nullable = false)
    @Builder.Default
    private Integer totalDonations = 0;

    @Column(nullable = false)
    @Builder.Default
    @Min(value = 0)
    private Integer totalMealsDonated = 0;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isDeleted = false;

    @Column(length = 255)
    private String organizationProofPath;
}