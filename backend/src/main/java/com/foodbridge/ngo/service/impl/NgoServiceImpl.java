package com.foodbridge.ngo.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbridge.allocation.entity.DonationRequest;
import com.foodbridge.allocation.enums.DonationRequestStatus;
import com.foodbridge.allocation.repository.DonationRequestRepository;
import com.foodbridge.auth.service.AuthService;
import com.foodbridge.donation.entity.FoodDonation;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.donation.repository.FoodDonationRepository;
import com.foodbridge.exception.ResourceNotFoundException;
import com.foodbridge.ngo.dto.DonationCardResponse;
import com.foodbridge.ngo.dto.DonationDetailsResponse;
import com.foodbridge.ngo.dto.DonationRequestDto;
import com.foodbridge.ngo.dto.MyDonationRequestResponse;
import com.foodbridge.ngo.dto.NgoDashboardResponse;
import com.foodbridge.ngo.entity.Ngo;
import com.foodbridge.ngo.repository.NgoRepository;
import com.foodbridge.ngo.service.NgoService;
import com.foodbridge.user.dto.response.UserResponse;
import com.foodbridge.user.entity.User;
import com.foodbridge.user.repository.UserRepository;
import com.foodbridge.ngo.dto.NgoProfileResponse;

@Service
public class NgoServiceImpl implements NgoService {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NgoRepository ngoRepository;

    @Autowired
    private FoodDonationRepository foodDonationRepository;

    @Autowired
    private DonationRequestRepository donationRequestRepository;

    @Override
    public NgoDashboardResponse getDashboard() {

        UserResponse currentUser = authService.getCurrentUser();

        User user = userRepository.findById(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        Ngo ngo = ngoRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("NGO profile not found."));

        return NgoDashboardResponse.builder()
                .ngoName(ngo.getNgoName())
                .availableDonations(
                        foodDonationRepository.countByStatus(DonationStatus.AVAILABLE))
                .pendingRequests(
                        donationRequestRepository.countByNgoAndStatus(
                                ngo,
                                DonationRequestStatus.PENDING))
                .approvedRequests(
                        donationRequestRepository.countByNgoAndStatus(
                                ngo,
                                DonationRequestStatus.APPROVED))
                .totalRequests(
                        donationRequestRepository.countByNgo(ngo))
                .build();
    }

    @Override
public List<DonationCardResponse> getAvailableDonations() {

    List<FoodDonation> donations =
            foodDonationRepository.findByStatus(DonationStatus.AVAILABLE);

    return donations.stream()
            .map(donation -> DonationCardResponse.builder()
                    .id(donation.getId())
                    .title(donation.getTitle())
                    .restaurantName(
                            donation.getRestaurant().getRestaurantName())
                    .estimatedMeals(donation.getEstimatedMeals())
                    .quantity(donation.getQuantity())
                    .quantityUnit(donation.getQuantityUnit())
                    .foodType(donation.getFoodType())
                    .pickupAddress(donation.getPickupAddress())
                    .expiryTime(donation.getExpiryTime())
                    .build())
            .collect(Collectors.toList());
}

@Override
public String requestDonation(Long donationId, DonationRequestDto request) {

    UserResponse currentUser = authService.getCurrentUser();

    User user = userRepository.findById(currentUser.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found."));

    Ngo ngo = ngoRepository.findByUser(user)
            .orElseThrow(() -> new ResourceNotFoundException("NGO profile not found."));

    FoodDonation donation = foodDonationRepository.findById(donationId)
            .orElseThrow(() -> new ResourceNotFoundException("Donation not found."));

    if (donation.getStatus() != DonationStatus.AVAILABLE) {
        throw new IllegalArgumentException("Donation is not available.");
    }

    if (request.getRequestedQuantity()
            .compareTo(donation.getRemainingQuantity()) > 0) {

        throw new IllegalArgumentException(
                "Requested quantity exceeds remaining quantity.");
    }

    if (donationRequestRepository.existsByDonationAndNgo(donation, ngo)) {
        throw new IllegalArgumentException(
                "You have already requested this donation.");
    }

    DonationRequest donationRequest = DonationRequest.builder()
            .donation(donation)
            .ngo(ngo)
            .requestedQuantity(request.getRequestedQuantity())
            .requestMessage(request.getRequestMessage())
            .status(DonationRequestStatus.PENDING)
            .build();

    donationRequestRepository.save(donationRequest);

    return "Donation request submitted successfully.";
        }

        @Override
public List<MyDonationRequestResponse> getMyDonationRequests() {

    UserResponse currentUser = authService.getCurrentUser();

    User user = userRepository.findById(currentUser.getId())
            .orElseThrow(() -> new ResourceNotFoundException("User not found."));

    Ngo ngo = ngoRepository.findByUser(user)
            .orElseThrow(() -> new ResourceNotFoundException("NGO profile not found."));

    List<DonationRequest> requests = donationRequestRepository.findByNgo(ngo);

    return requests.stream()
            .map(request -> MyDonationRequestResponse.builder()
                    .requestId(request.getId())
                    .donationId(request.getDonation().getId())
                    .donationTitle(request.getDonation().getTitle())
                    .restaurantName(request.getDonation()
                            .getRestaurant()
                            .getRestaurantName())
                    .requestedQuantity(request.getRequestedQuantity())
                    .status(request.getStatus())
                    .requestedAt(request.getRequestedAt())
                    .build())
            .toList();
        }        

        @Override
public DonationDetailsResponse getDonationDetails(Long donationId) {

    FoodDonation donation = foodDonationRepository.findById(donationId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Donation not found."));

    return DonationDetailsResponse.builder()
            .id(donation.getId())
            .title(donation.getTitle())
            .description(donation.getDescription())
            .restaurantName(
                    donation.getRestaurant().getRestaurantName())
            .foodType(donation.getFoodType())
            .foodCondition(donation.getFoodCondition())
            .quantity(donation.getQuantity())
            .remainingQuantity(donation.getRemainingQuantity())
            .quantityUnit(donation.getQuantityUnit())
            .estimatedMeals(donation.getEstimatedMeals())
            .pickupAddress(donation.getPickupAddress())
            .expiryTime(donation.getExpiryTime())
            .specialInstructions(donation.getSpecialInstructions())
            .build();
}

@Override
@Transactional
public String cancelDonationRequest(Long requestId) {

    UserResponse currentUser = authService.getCurrentUser();

    User user = userRepository.findById(currentUser.getId())
            .orElseThrow(() ->
                    new ResourceNotFoundException("User not found."));

    Ngo ngo = ngoRepository.findByUser(user)
            .orElseThrow(() ->
                    new ResourceNotFoundException("NGO profile not found."));

    DonationRequest donationRequest = donationRequestRepository
            .findById(requestId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Donation request not found."));

    if (!donationRequest.getNgo().getId().equals(ngo.getId())) {
        throw new IllegalArgumentException(
                "You are not authorized to cancel this request.");
    }

    if (donationRequest.getStatus() != DonationRequestStatus.PENDING) {
        throw new IllegalArgumentException(
                "Only pending requests can be cancelled.");
    }

    donationRequest.setStatus(DonationRequestStatus.CANCELLED);

    donationRequestRepository.save(donationRequest);

    return "Donation request cancelled successfully.";
}

@Override
public NgoProfileResponse getProfile() {

    UserResponse currentUser = authService.getCurrentUser();

    User user = userRepository.findById(currentUser.getId())
            .orElseThrow(() ->
                    new ResourceNotFoundException("User not found."));

    Ngo ngo = ngoRepository.findByUser(user)
            .orElseThrow(() ->
                    new ResourceNotFoundException("NGO profile not found."));

    return NgoProfileResponse.builder()
            .ngoName(ngo.getNgoName())
            .registrationNumber(ngo.getRegistrationNumber())
            .address(ngo.getAddress())
            .latitude(ngo.getLatitude())
            .longitude(ngo.getLongitude())
            .operatingRadius(ngo.getOperatingRadius())
            .placeId(ngo.getPlaceId())
            .email(user.getEmail())
            .phone(user.getPhone())
            .build();
}
}