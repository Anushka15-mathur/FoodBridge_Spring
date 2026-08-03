package com.foodbridge.profile.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @Size(max = 100)
    private String city;

    @Size(max = 100)
    private String state;

    @Size(max = 20)
    private String pincode;

    @NotNull(message = "Latitude is required. Use current location or enter it manually.")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private Double latitude;

    @NotNull(message = "Longitude is required. Use current location or enter it manually.")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private Double longitude;

    @NotBlank(message = "License number is required")
    private String licenseNumber;

    private String placeId;
}
