package com.foodbridge.profile.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NgoProfileRequest {

    @NotBlank(message = "NGO name is required")
    @Size(max = 150)
    private String ngoName;

    @NotBlank(message = "Address is required")
    private String address;

    @DecimalMin(value = "-90.0")
    @DecimalMax(value = "90.0")
    private Double latitude;

    @DecimalMin(value = "-180.0")
    @DecimalMax(value = "180.0")
    private Double longitude;

    @NotBlank(message = "Registration number is required")
    private String registrationNumber;

    private String placeId;

    @Min(value = 1)
    private Integer operatingRadius;
}