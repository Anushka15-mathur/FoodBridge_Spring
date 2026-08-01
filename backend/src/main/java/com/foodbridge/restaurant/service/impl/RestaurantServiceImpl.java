package com.foodbridge.restaurant.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodbridge.auth.service.AuthService;
import com.foodbridge.allocation.entity.DonationRequest;
import com.foodbridge.allocation.repository.DonationRequestRepository;
import com.foodbridge.exception.ResourceNotFoundException;
import com.foodbridge.restaurant.dto.RestaurantRequestResponse;
import com.foodbridge.restaurant.entity.Restaurant;
import com.foodbridge.restaurant.repository.RestaurantRepository;
import com.foodbridge.restaurant.service.RestaurantService;
import com.foodbridge.user.dto.response.UserResponse;
import com.foodbridge.user.entity.User;
import com.foodbridge.user.repository.UserRepository;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private DonationRequestRepository donationRequestRepository;

    @Override
    public List<RestaurantRequestResponse> getDonationRequests() {

        UserResponse currentUser = authService.getCurrentUser();

        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        Restaurant restaurant = restaurantRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant profile not found."));

        List<DonationRequest> requests =
                donationRequestRepository.findByDonation_Restaurant(restaurant);

        return requests.stream()
                .map(request -> RestaurantRequestResponse.builder()
                        .requestId(request.getId())
                        .donationId(request.getDonation().getId())
                        .donationTitle(request.getDonation().getTitle())
                        .ngoName(request.getNgo().getNgoName())
                        .requestedQuantity(request.getRequestedQuantity())
                        .requestMessage(request.getRequestMessage())
                        .status(request.getStatus())
                        .requestedAt(request.getRequestedAt())
                        .build())
                .collect(Collectors.toList());
    }
}