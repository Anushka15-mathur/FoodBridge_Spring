package com.foodbridge.profile.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VolunteerProfileRequest {

    private String drivingLicenseNumber;

    private String aadhaarNumber;

    private String emergencyContact;

    private String address;

    private String city;

    private String state;

    private String pincode;

    @DecimalMin(value = "-90.0")
    @DecimalMax(value = "90.0")
    private Double currentLatitude;

    @DecimalMin(value = "-180.0")
    @DecimalMax(value = "180.0")
    private Double currentLongitude;

    @Min(value = 1)
    private Integer maxDeliveryDistance;
}
