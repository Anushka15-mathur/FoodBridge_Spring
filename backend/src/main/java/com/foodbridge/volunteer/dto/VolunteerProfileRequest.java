package com.foodbridge.volunteer.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class VolunteerProfileRequest {

    @DecimalMin("-90.0")
    @DecimalMax("90.0")
    private Double currentLatitude;

    @DecimalMin("-180.0")
    @DecimalMax("180.0")
    private Double currentLongitude;

    @Min(1)
    private Integer maxDeliveryDistance;

    private String drivingLicensePath;

    private String identityProofPath;
}