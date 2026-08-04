package com.foodbridge.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantOwnerResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
}