package com.foodbridge.restaurant.service;

import java.util.List;

import com.foodbridge.restaurant.dto.RestaurantRequestResponse;

public interface RestaurantService {

    List<RestaurantRequestResponse> getDonationRequests();

}