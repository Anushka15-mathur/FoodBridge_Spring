package com.foodbridge.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantProfileResponse {

    private Long id;
    private String restaurantName;
    private String licenseNumber;
    private String address;
    private String city;
    private String state;
    private String pincode;
    private Double latitude;
    private Double longitude;
    private String placeId;
    private String logoPath;
    private String fssaiCertificatePath;
    private RestaurantOwnerResponse owner;
}
