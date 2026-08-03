package com.foodbridge.ngo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NgoProfileResponse {

    private String ngoName;

    private String registrationNumber;

    private String address;

    private Double latitude;

    private Double longitude;

    private Integer operatingRadius;

    private String placeId;

    private String email;

    private String phone;
}