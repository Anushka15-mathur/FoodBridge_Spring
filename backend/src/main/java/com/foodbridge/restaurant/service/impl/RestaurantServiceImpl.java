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

import java.math.BigDecimal;

import com.foodbridge.allocation.entity.DonationAllocation;
import com.foodbridge.allocation.enums.AllocationStatus;
import com.foodbridge.allocation.enums.DonationRequestStatus;
import com.foodbridge.donation.entity.FoodDonation;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.restaurant.dto.ApproveRequestDto;
import com.foodbridge.allocation.repository.DonationAllocationRepository;

import org.springframework.transaction.annotation.Transactional;
import com.foodbridge.donation.repository.FoodDonationRepository;

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

    @Autowired
    private DonationAllocationRepository donationAllocationRepository;    

    @Autowired
    private FoodDonationRepository foodDonationRepository;

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

@Override
@Transactional
public String approveDonationRequest(Long requestId,
                                     ApproveRequestDto request) {

    UserResponse currentUser = authService.getCurrentUser();

    User user = userRepository.findById(currentUser.getId())
            .orElseThrow(() ->
                    new ResourceNotFoundException("User not found."));

    DonationRequest donationRequest = donationRequestRepository
            .findById(requestId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Donation request not found."));

    if (donationRequest.getStatus() != DonationRequestStatus.PENDING) {
        throw new IllegalArgumentException(
                "Only pending requests can be approved.");
    }

    FoodDonation donation = donationRequest.getDonation();

    BigDecimal requestedQuantity =
            donationRequest.getRequestedQuantity();

    if (donation.getRemainingQuantity()
            .compareTo(requestedQuantity) < 0) {

        throw new IllegalArgumentException(
                "Insufficient remaining quantity.");
    }

    donationRequest.setStatus(DonationRequestStatus.APPROVED);

    donation.setRemainingQuantity(
            donation.getRemainingQuantity()
                    .subtract(requestedQuantity));

    if (donation.getRemainingQuantity()
            .compareTo(BigDecimal.ZERO) == 0) {

        donation.setStatus(DonationStatus.FULLY_ALLOCATED);

    } else {

        donation.setStatus(DonationStatus.PARTIALLY_ALLOCATED);
    }

    DonationAllocation allocation = DonationAllocation.builder()
            .donationRequest(donationRequest)
            .allocatedBy(user)
            .allocatedQuantity(requestedQuantity)
            .adminRemarks(request.getRemarks())
            .status(AllocationStatus.ALLOCATED)
            .build();

    donationAllocationRepository.save(allocation);

    donationRequestRepository.save(donationRequest);

    foodDonationRepository.save(donation);

    return "Donation request approved successfully.";
}
}