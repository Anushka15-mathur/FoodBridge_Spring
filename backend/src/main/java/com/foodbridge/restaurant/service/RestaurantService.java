package com.foodbridge.restaurant.service;

import java.util.List;

import com.foodbridge.restaurant.dto.ApproveRequestDto;
import com.foodbridge.restaurant.dto.RejectRequestDto;
import com.foodbridge.restaurant.dto.RestaurantDashboardResponse;
import com.foodbridge.restaurant.dto.RestaurantProfileResponse;
import com.foodbridge.restaurant.dto.RestaurantRequestResponse;

public interface RestaurantService {

    RestaurantDashboardResponse getDashboard();

    RestaurantProfileResponse getProfile();

    List<RestaurantRequestResponse> getDonationRequests();

    String approveDonationRequest(Long requestId, ApproveRequestDto request);

    String rejectDonationRequest(Long requestId, RejectRequestDto request);
}
