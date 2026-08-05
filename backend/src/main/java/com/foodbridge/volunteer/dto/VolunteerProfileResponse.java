package com.foodbridge.volunteer.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VolunteerProfileResponse {

    private String fullName;

    private String email;

    private String phone;

    private Boolean available;

    private Boolean verified;

    private Double currentLatitude;

    private Double currentLongitude;

    private Integer maxDeliveryDistance;

    private String drivingLicensePath;

    private String identityProofPath;
}