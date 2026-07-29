package com.foodbridge.restaurant.entity;

import com.foodbridge.common.entity.BaseEntity;
import com.foodbridge.user.entity.User;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "restaurants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Restaurant extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @NotNull(message = "Restaurant user is required")
    private User user;

    @Column(nullable = false, length = 150)
    @NotBlank(message = "Restaurant name is required")
    @Size(max = 150)
    private String restaurantName;

    @Column(nullable = false)
    @NotBlank(message = "Address is required")
    private String address;

    @Column
    @DecimalMin(value = "-90.0")
    @DecimalMax(value = "90.0")
    private Double latitude;

    @Column
    @DecimalMin(value = "-180.0")
    @DecimalMax(value = "180.0")
    private Double longitude;

    @Column(nullable = false, unique = true, length = 100)
    @NotBlank(message = "License number is required")
    private String licenseNumber;

    @Column(length = 255)
    private String placeId;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isDeleted = false;

    @Column(length = 255)
    private String logoPath;

    @Column(length = 255)
    private String fssaiCertificatePath;
}