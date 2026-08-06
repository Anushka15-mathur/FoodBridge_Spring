package com.foodbridge.ngo.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
import com.foodbridge.donation.repository.FoodDonationRepository;
import com.foodbridge.donation.service.DonationExpiryService;
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
import com.foodbridge.ngo.dto.UpdateNgoProfileDto;

import com.foodbridge.ngo.dto.VolunteerListResponse;
import com.foodbridge.volunteer.entity.Volunteer;
import com.foodbridge.volunteer.repository.VolunteerRepository;

import com.foodbridge.allocation.repository.DonationAllocationRepository;
import com.foodbridge.delivery.repository.DeliveryRepository;
import com.foodbridge.allocation.entity.DonationAllocation;
import com.foodbridge.delivery.entity.Delivery;

import java.time.LocalDateTime;

import com.foodbridge.ngo.dto.AssignVolunteerRequest;
import com.foodbridge.delivery.enums.DeliveryStatus;


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

    @Autowired
<<<<<<< HEAD
    private VolunteerRepository volunteerRepository;

    @Autowired
    private DonationAllocationRepository allocationRepository;

   @Autowired
   private DeliveryRepository deliveryRepository;
=======
    private DonationExpiryService donationExpiryService;
>>>>>>> develop

    @Override
    public NgoDashboardResponse getDashboard() {

        donationExpiryService.expireDonations();

        // UserResponse currentUser = authService.getCurrentUser();

        // User user = userRepository.findById(currentUser.getId())
        //         .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        // Ngo ngo = ngoRepository.findByUser(user)
        //         .orElseThrow(() -> new ResourceNotFoundException("NGO profile not found."));
        UserResponse currentUser = authService.getCurrentUser();

User user = userRepository.findById(currentUser.getId())
        .orElseThrow(() -> new ResourceNotFoundException("User not found."));

System.out.println("========== NGO DEBUG ==========");
System.out.println("Current User ID      : " + currentUser.getId());
System.out.println("Current Email        : " + currentUser.getEmail());
System.out.println("Current Role         : " + currentUser.getRole());
System.out.println("Database User ID     : " + user.getId());
System.out.println("Database Email       : " + user.getEmail());

System.out.println(
    "findByUser(user) = " + ngoRepository.findByUser(user).isPresent()
);

System.out.println("================================");

// Ngo ngo = ngoRepository.findByUser(user)
//         .orElseThrow(() -> new ResourceNotFoundException("NGO profile not found."));
System.out.println("Current User ID = " + user.getId());

Ngo ngo = ngoRepository.findByUser(user)
        .orElseThrow(() ->
                new ResourceNotFoundException(
                        "NGO profile not found for user id = " + user.getId()));

        return NgoDashboardResponse.builder()
        .ngoName(ngo.getNgoName())
        .availableDonations(
                foodDonationRepository
                        .countByStatusInAndIsDeletedFalseAndRemainingQuantityGreaterThanAndExpiryTimeAfter(
                                donationExpiryService.getRequestableStatuses(),
                                BigDecimal.ZERO,
                                LocalDateTime.now()))
        .pendingRequests(
                donationRequestRepository.countByNgoAndStatus(
                        ngo,
                        DonationRequestStatus.PENDING))
        .approvedRequests(
                donationRequestRepository.countByNgoAndStatus(
                        ngo,
                        DonationRequestStatus.APPROVED))
        .rejectedRequests(
                donationRequestRepository.countByNgoAndStatus(
                        ngo,
                        DonationRequestStatus.REJECTED))
        .cancelledRequests(
                donationRequestRepository.countByNgoAndStatus(
                        ngo,
                        DonationRequestStatus.CANCELLED))
        .totalRequests(
                donationRequestRepository.countByNgo(ngo))
        .build();
    }

    @Override
public List<DonationCardResponse> getAvailableDonations() {

    donationExpiryService.expireDonations();

    List<FoodDonation> donations = foodDonationRepository
            .findByStatusInAndIsDeletedFalseAndRemainingQuantityGreaterThanAndExpiryTimeAfterOrderByExpiryTimeAsc(
                    donationExpiryService.getRequestableStatuses(),
                    BigDecimal.ZERO,
                    LocalDateTime.now());

    return donations.stream()
            .map(donation -> DonationCardResponse.builder()
                    .id(donation.getId())
                    .title(donation.getTitle())
                    .restaurantName(
                            donation.getRestaurant().getRestaurantName())
                    .estimatedMeals(donation.getEstimatedMeals())
                    .quantity(donation.getQuantity())
                    .remainingQuantity(donation.getRemainingQuantity())
                    .quantityUnit(donation.getQuantityUnit())
                    .foodType(donation.getFoodType())
                    .pickupAddress(donation.getPickupAddress())
                    .expiryTime(donation.getExpiryTime())
                    .status(donation.getStatus())
                    .build())
            .collect(Collectors.toList());
}

@Override
public String requestDonation(Long donationId, DonationRequestDto request) {

    donationExpiryService.expireDonations();

//     UserResponse currentUser = authService.getCurrentUser();

//     User user = userRepository.findById(currentUser.getId())
//             .orElseThrow(() -> new ResourceNotFoundException("User not found."));

//     Ngo ngo = ngoRepository.findByUser(user)
//             .orElseThrow(() -> new ResourceNotFoundException("NGO profile not found."));
UserResponse currentUser = authService.getCurrentUser();

User user = userRepository.findById(currentUser.getId())
        .orElseThrow(() -> new ResourceNotFoundException("User not found."));

System.out.println("\n========== NGO REQUEST DEBUG ==========");
System.out.println("Current User ID      : " + currentUser.getId());
System.out.println("Current User Email   : " + currentUser.getEmail());
System.out.println("Current User Role    : " + currentUser.getRole());

System.out.println("Database User ID     : " + user.getId());
System.out.println("Database User Email  : " + user.getEmail());

boolean ngoExists = ngoRepository.findByUser(user).isPresent();

System.out.println("NGO Exists           : " + ngoExists);

Ngo ngo = ngoRepository.findByUser(user)
        .orElseThrow(() ->
                new ResourceNotFoundException(
                        "NGO profile not found for user id = " + user.getId()));

System.out.println("NGO ID               : " + ngo.getId());
System.out.println("=======================================\n");

    FoodDonation donation = foodDonationRepository.findByIdAndIsDeletedFalse(donationId)
            .orElseThrow(() -> new ResourceNotFoundException("Donation not found."));

    if (!donationExpiryService.isRequestable(donation)) {
        throw new IllegalArgumentException(
                "Donation is no longer available for request.");
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

    donationExpiryService.expireDonations();

    FoodDonation donation = foodDonationRepository.findByIdAndIsDeletedFalse(donationId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Donation not found."));

    if (!donationExpiryService.isRequestable(donation)) {
        throw new ResourceNotFoundException("Donation is no longer available.");
    }

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
            .status(donation.getStatus())
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
            .logoPath(ngo.getLogoPath())   
            .build();
}

@Override
@Transactional
public String updateProfile(UpdateNgoProfileDto request) {

    UserResponse currentUser = authService.getCurrentUser();

    User user = userRepository.findById(currentUser.getId())
            .orElseThrow(() ->
                    new ResourceNotFoundException("User not found."));

    Ngo ngo = ngoRepository.findByUser(user)
            .orElseThrow(() ->
                    new ResourceNotFoundException("NGO profile not found."));

    ngo.setNgoName(request.getNgoName());
    ngo.setAddress(request.getAddress());
    ngo.setLatitude(request.getLatitude());
    ngo.setLongitude(request.getLongitude());
    ngo.setOperatingRadius(request.getOperatingRadius());
    ngo.setPlaceId(request.getPlaceId());

    user.setPhone(request.getPhone());

    ngoRepository.save(ngo);
    userRepository.save(user);

    return "NGO profile updated successfully.";

}

@Override
@Transactional(readOnly = true)
public List<VolunteerListResponse> getAvailableVolunteers() {

    List<Volunteer> volunteers =
            volunteerRepository.findByAvailableTrueAndVerifiedTrueAndIsDeletedFalse();

    return volunteers.stream()
            .map(volunteer -> VolunteerListResponse.builder()
                    .volunteerId(volunteer.getId())
                    .fullName(
                            volunteer.getUser().getFirstName()
                                    + " "
                                    + volunteer.getUser().getLastName())
                    .email(volunteer.getUser().getEmail())
                    .phone(volunteer.getUser().getPhone())
                    .build())
            .toList();
}

@Override
@Transactional
public String assignVolunteer(AssignVolunteerRequest request) {

   DonationRequest donationRequest = donationRequestRepository
        .findById(request.getRequestId())
        .orElseThrow(() ->
                new ResourceNotFoundException("Donation request not found."));

DonationAllocation allocation = allocationRepository
        .findByDonationRequest(donationRequest)
        .orElseThrow(() ->
                new ResourceNotFoundException("Allocation not found."));

    Volunteer volunteer = volunteerRepository.findById(request.getVolunteerId())
            .orElseThrow(() ->
                    new ResourceNotFoundException("Volunteer not found."));

    if (!Boolean.TRUE.equals(volunteer.getAvailable())) {
        throw new IllegalArgumentException("Volunteer is not available.");
    }

    Delivery delivery = Delivery.builder()
            .allocation(allocation)
            .volunteer(volunteer)
            .status(DeliveryStatus.ASSIGNED)
            .assignedAt(LocalDateTime.now())
            .build();

    deliveryRepository.save(delivery);

    volunteer.setAvailable(false);
    volunteerRepository.save(volunteer);

    return "Volunteer assigned successfully.";
}
}
