package com.foodbridge.profile.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RestaurantProfileRequest {

    @NotBlank(message = "Restaurant name is required")
    @Size(max = 150)
    private String restaurantName;

    @NotBlank(message = "Address is required")
    private String address;

    @DecimalMin(value = "-90.0")
    @DecimalMax(value = "90.0")
    private Double latitude;

    @DecimalMin(value = "-180.0")
    @DecimalMax(value = "180.0")
    private Double longitude;

    @NotBlank(message = "License number is required")
    private String licenseNumber;

    private String placeId;
}