package com.foodbridge.restaurant.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDashboardResponse {

    private long totalDonations;
    private long totalMealsDonated;
    private long availableDonations;
    private long deliveredDonations;
    private long expiredDonations;
}
