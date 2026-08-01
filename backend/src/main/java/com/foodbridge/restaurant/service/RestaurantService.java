package com.foodbridge.restaurant.service;

import java.util.List;

import com.foodbridge.restaurant.dto.RestaurantRequestResponse;

import com.foodbridge.restaurant.dto.ApproveRequestDto;

public interface RestaurantService {

    List<RestaurantRequestResponse> getDonationRequests();

    String approveDonationRequest(Long requestId, ApproveRequestDto request);

}