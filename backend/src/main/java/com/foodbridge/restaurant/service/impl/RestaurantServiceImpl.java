package com.foodbridge.restaurant.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbridge.allocation.entity.DonationAllocation;
import com.foodbridge.allocation.entity.DonationRequest;
import com.foodbridge.allocation.enums.AllocationStatus;
import com.foodbridge.allocation.enums.DonationRequestStatus;
import com.foodbridge.allocation.repository.DonationAllocationRepository;
import com.foodbridge.allocation.repository.DonationRequestRepository;
import com.foodbridge.auth.service.AuthService;
import com.foodbridge.donation.entity.FoodDonation;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.donation.repository.FoodDonationRepository;
import com.foodbridge.exception.BadRequestException;
import com.foodbridge.exception.ResourceNotFoundException;
import com.foodbridge.restaurant.dto.ApproveRequestDto;
import com.foodbridge.restaurant.dto.RejectRequestDto;
import com.foodbridge.restaurant.dto.RestaurantDashboardResponse;
import com.foodbridge.restaurant.dto.RestaurantOwnerResponse;
import com.foodbridge.restaurant.dto.RestaurantProfileResponse;
import com.foodbridge.restaurant.dto.RestaurantRequestResponse;
import com.foodbridge.restaurant.entity.Restaurant;
import com.foodbridge.restaurant.repository.RestaurantRepository;
import com.foodbridge.restaurant.service.RestaurantService;
import com.foodbridge.user.dto.response.UserResponse;
import com.foodbridge.user.entity.User;
import com.foodbridge.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RestaurantServiceImpl implements RestaurantService {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final DonationRequestRepository donationRequestRepository;
    private final DonationAllocationRepository donationAllocationRepository;
    private final FoodDonationRepository foodDonationRepository;

    @Override
    @Transactional(readOnly = true)
    public RestaurantDashboardResponse getDashboard() {
        Restaurant restaurant = getCurrentRestaurant();

        List<FoodDonation> donations = foodDonationRepository
                .findByRestaurantAndIsDeletedFalseOrderByCreatedAtDesc(restaurant);

        LocalDateTime now = LocalDateTime.now();

        long totalDonations = donations.size();
        long totalMealsDonated = donations.stream()
                .map(FoodDonation::getEstimatedMeals)
                .filter(java.util.Objects::nonNull)
                .mapToLong(Integer::longValue)
                .sum();

        long deliveredDonations = donations.stream()
                .filter(donation -> donation.getStatus() == DonationStatus.DELIVERED)
                .count();

        long expiredDonations = donations.stream()
                .filter(donation -> isExpired(donation, now))
                .count();

        long availableDonations = donations.stream()
                .filter(donation -> donation.getStatus() == DonationStatus.AVAILABLE)
                .filter(donation -> !isExpired(donation, now))
                .count();

        return RestaurantDashboardResponse.builder()
                .totalDonations(totalDonations)
                .totalMealsDonated(totalMealsDonated)
                .availableDonations(availableDonations)
                .deliveredDonations(deliveredDonations)
                .expiredDonations(expiredDonations)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public RestaurantProfileResponse getProfile() {
        Restaurant restaurant = getCurrentRestaurant();
        User owner = restaurant.getUser();

        return RestaurantProfileResponse.builder()
                .id(restaurant.getId())
                .restaurantName(restaurant.getRestaurantName())
                .licenseNumber(restaurant.getLicenseNumber())
                .address(restaurant.getAddress())
                .city(restaurant.getCity())
                .state(restaurant.getState())
                .pincode(restaurant.getPincode())
                .latitude(restaurant.getLatitude())
                .longitude(restaurant.getLongitude())
                .placeId(restaurant.getPlaceId())
                .logoPath(restaurant.getLogoPath())
                .fssaiCertificatePath(restaurant.getFssaiCertificatePath())
                .owner(RestaurantOwnerResponse.builder()
                        .id(owner.getId())
                        .firstName(owner.getFirstName())
                        .lastName(owner.getLastName())
                        .email(owner.getEmail())
                        .phone(owner.getPhone())
                        .build())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<RestaurantRequestResponse> getDonationRequests() {
        Restaurant restaurant = getCurrentRestaurant();

        return donationRequestRepository.findByDonation_Restaurant(restaurant)
                .stream()
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
                .toList();
    }

    @Override
    public String approveDonationRequest(Long requestId, ApproveRequestDto request) {
        Restaurant restaurant = getCurrentRestaurant();
        DonationRequest donationRequest = getOwnedRequest(requestId, restaurant);

        if (donationRequest.getStatus() != DonationRequestStatus.PENDING) {
            throw new BadRequestException("Only pending requests can be approved.");
        }

        FoodDonation donation = donationRequest.getDonation();
        BigDecimal requestedQuantity = donationRequest.getRequestedQuantity();

        if (donation.getRemainingQuantity().compareTo(requestedQuantity) < 0) {
            throw new BadRequestException("Insufficient remaining quantity.");
        }

        donationRequest.setStatus(DonationRequestStatus.APPROVED);
        donation.setRemainingQuantity(
                donation.getRemainingQuantity().subtract(requestedQuantity));

        if (donation.getRemainingQuantity().compareTo(BigDecimal.ZERO) == 0) {
            donation.setStatus(DonationStatus.FULLY_ALLOCATED);
        } else {
            donation.setStatus(DonationStatus.PARTIALLY_ALLOCATED);
        }

        DonationAllocation allocation = DonationAllocation.builder()
                .donationRequest(donationRequest)
                .allocatedBy(restaurant.getUser())
                .allocatedQuantity(requestedQuantity)
                .adminRemarks(request != null ? request.getRemarks() : null)
                .status(AllocationStatus.ALLOCATED)
                .build();

        donationAllocationRepository.save(allocation);
        donationRequestRepository.save(donationRequest);
        foodDonationRepository.save(donation);

        return "Donation request approved successfully.";
    }

    @Override
    public String rejectDonationRequest(Long requestId, RejectRequestDto request) {
        Restaurant restaurant = getCurrentRestaurant();
        DonationRequest donationRequest = getOwnedRequest(requestId, restaurant);

        if (donationRequest.getStatus() != DonationRequestStatus.PENDING) {
            throw new BadRequestException("Only pending requests can be rejected.");
        }

        donationRequest.setStatus(DonationRequestStatus.REJECTED);
        donationRequestRepository.save(donationRequest);

        return "Donation request rejected successfully.";
    }

    private boolean isExpired(FoodDonation donation, LocalDateTime now) {
        if (donation.getStatus() == DonationStatus.EXPIRED) {
            return true;
        }

        return donation.getExpiryTime() != null
                && donation.getExpiryTime().isBefore(now);
    }

    private Restaurant getCurrentRestaurant() {
        UserResponse currentUser = authService.getCurrentUser();

        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        return restaurantRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Restaurant profile not found. Please complete your profile first."));
    }

    private DonationRequest getOwnedRequest(Long requestId, Restaurant restaurant) {
        DonationRequest request = donationRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Donation request not found."));

        if (!request.getDonation().getRestaurant().getId().equals(restaurant.getId())) {
            throw new ResourceNotFoundException("Donation request not found.");
        }

        return request;
    }
}
