package com.foodbridge.volunteer.entity;

import com.foodbridge.common.entity.BaseEntity;
import com.foodbridge.user.entity.User;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "volunteers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Volunteer extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @NotNull(message = "Volunteer user is required")
    private User user;

    @Column(nullable = false)
    @Builder.Default
    private Boolean available = true;

    @Column(nullable = false)
    @Builder.Default
    private Boolean verified = false;

    @Column
    @DecimalMin(value = "-90.0")
    @DecimalMax(value = "90.0")
    private Double currentLatitude;

    @Column
    @DecimalMin(value = "-180.0")
    @DecimalMax(value = "180.0")
    private Double currentLongitude;

    @Column(nullable = false)
    @Min(value = 1, message = "Maximum delivery distance must be at least 1 km")
    @Builder.Default
    private Integer maxDeliveryDistance = 20;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isDeleted = false;

    @Column(length = 255)
    private String drivingLicensePath;

    @Column(length = 255)
    private String identityProofPath;

    @Column(length = 50)
    private String drivingLicenseNumber;

    @Column(length = 20)
    private String aadhaarNumber;

    @Column(length = 15)
    private String emergencyContact;

    @Column(length = 500)
    private String address;

    @Column(length = 100)
    private String city;

    @Column(length = 100)
    private String state;

    @Column(length = 10)
    private String pincode;
}
