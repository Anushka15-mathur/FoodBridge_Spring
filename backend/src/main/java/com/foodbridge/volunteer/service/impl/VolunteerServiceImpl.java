package com.foodbridge.volunteer.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbridge.allocation.entity.DonationAllocation;
import com.foodbridge.allocation.entity.DonationRequest;
import com.foodbridge.auth.service.AuthService;
import com.foodbridge.delivery.entity.Delivery;
import com.foodbridge.delivery.enums.DeliveryStatus;
import com.foodbridge.delivery.repository.DeliveryRepository;
import com.foodbridge.donation.entity.FoodDonation;
import com.foodbridge.exception.ResourceNotFoundException;
import com.foodbridge.profile.dto.request.VolunteerProfileRequest;
import com.foodbridge.user.dto.response.UserResponse;
import com.foodbridge.user.entity.User;
import com.foodbridge.user.repository.UserRepository;
import com.foodbridge.volunteer.dto.UpdateAvailabilityRequest;
import com.foodbridge.volunteer.dto.VolunteerDashboardResponse;
import com.foodbridge.volunteer.dto.VolunteerDeliveryResponse;
import com.foodbridge.volunteer.dto.VolunteerProfileResponse;
import com.foodbridge.volunteer.entity.Volunteer;
import com.foodbridge.volunteer.repository.VolunteerRepository;
import com.foodbridge.volunteer.service.VolunteerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class VolunteerServiceImpl implements VolunteerService {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final VolunteerRepository volunteerRepository;
    private final DeliveryRepository deliveryRepository;

    @Override
    @Transactional(readOnly = true)
    public VolunteerProfileResponse getProfile() {

        Volunteer volunteer = getCurrentVolunteer();
        User user = volunteer.getUser();

        return VolunteerProfileResponse.builder()
                .fullName(user.getFirstName() + " " + user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .available(volunteer.getAvailable())
                .verified(volunteer.getVerified())
                .currentLatitude(volunteer.getCurrentLatitude())
                .currentLongitude(volunteer.getCurrentLongitude())
                .maxDeliveryDistance(volunteer.getMaxDeliveryDistance())
                .drivingLicensePath(volunteer.getDrivingLicensePath())
                .identityProofPath(volunteer.getIdentityProofPath())
                .drivingLicenseNumber(volunteer.getDrivingLicenseNumber())
                .aadhaarNumber(volunteer.getAadhaarNumber())
                .emergencyContact(volunteer.getEmergencyContact())
                .address(volunteer.getAddress())
                .city(volunteer.getCity())
                .state(volunteer.getState())
                .pincode(volunteer.getPincode())
                .build();
    }

    @Override
    public String updateProfile(VolunteerProfileRequest request) {

        Volunteer volunteer = getCurrentVolunteer();

        volunteer.setCurrentLatitude(request.getCurrentLatitude());
        volunteer.setCurrentLongitude(request.getCurrentLongitude());
        volunteer.setMaxDeliveryDistance(request.getMaxDeliveryDistance());

        volunteerRepository.save(volunteer);

        return "Volunteer profile updated successfully.";
    }

    @Override
    @Transactional(readOnly = true)
    public VolunteerDashboardResponse getDashboard() {

        Volunteer volunteer = getCurrentVolunteer();
        User user = volunteer.getUser();

        long assignedDeliveries =
                deliveryRepository.countByVolunteerAndStatus(
                        volunteer,
                        DeliveryStatus.ASSIGNED)
                +
                deliveryRepository.countByVolunteerAndStatus(
                        volunteer,
                        DeliveryStatus.PICKUP_IN_PROGRESS);

        long pickedUpDeliveries =
                deliveryRepository.countByVolunteerAndStatus(
                        volunteer,
                        DeliveryStatus.PICKED_UP);

        long inTransitDeliveries =
                deliveryRepository.countByVolunteerAndStatus(
                        volunteer,
                        DeliveryStatus.IN_TRANSIT);

        long completedDeliveries =
                deliveryRepository.countByVolunteerAndStatus(
                        volunteer,
                        DeliveryStatus.DELIVERED);

        return VolunteerDashboardResponse.builder()
                .volunteerName(
                        user.getFirstName() + " " + user.getLastName())
                .available(volunteer.getAvailable())
                .assignedDeliveries(assignedDeliveries)
                .pickedUpDeliveries(pickedUpDeliveries)
                .inTransitDeliveries(inTransitDeliveries)
                .completedDeliveries(completedDeliveries)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<VolunteerDeliveryResponse> getAssignedDeliveries() {

        Volunteer volunteer = getCurrentVolunteer();

        return deliveryRepository.findByVolunteer(volunteer)
                .stream()
                .filter(delivery ->
                        delivery.getStatus() != DeliveryStatus.DELIVERED
                                &&
                        delivery.getStatus() != DeliveryStatus.CANCELLED)
                .map(this::mapToDeliveryResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public VolunteerDeliveryResponse getDeliveryDetails(Long deliveryId) {

        Volunteer volunteer = getCurrentVolunteer();

        Delivery delivery = getVolunteerDelivery(
                deliveryId,
                volunteer);

        return mapToDeliveryResponse(delivery);
    }

    @Override
    public String markPickup(Long deliveryId) {

        Volunteer volunteer = getCurrentVolunteer();

        Delivery delivery = getVolunteerDelivery(
                deliveryId,
                volunteer);

        if (delivery.getStatus() != DeliveryStatus.ASSIGNED
                &&
                delivery.getStatus() != DeliveryStatus.PICKUP_IN_PROGRESS) {

            throw new IllegalArgumentException(
                    "Only assigned deliveries can be marked as picked up.");
        }

        delivery.setStatus(DeliveryStatus.PICKED_UP);
        delivery.setPickupTime(LocalDateTime.now());

        deliveryRepository.save(delivery);

        return "Delivery marked as picked up successfully.";
    }

    @Override
    public String markInTransit(Long deliveryId) {

        Volunteer volunteer = getCurrentVolunteer();

        Delivery delivery = getVolunteerDelivery(
                deliveryId,
                volunteer);

        if (delivery.getStatus() != DeliveryStatus.PICKED_UP) {
            throw new IllegalArgumentException(
                    "Delivery must be picked up before starting transit.");
        }

        delivery.setStatus(DeliveryStatus.IN_TRANSIT);

        deliveryRepository.save(delivery);

        return "Delivery is now in transit.";
    }

    @Override
    public String markDelivered(Long deliveryId) {

        Volunteer volunteer = getCurrentVolunteer();

        Delivery delivery = getVolunteerDelivery(
                deliveryId,
                volunteer);

        if (delivery.getStatus() != DeliveryStatus.IN_TRANSIT) {
            throw new IllegalArgumentException(
                    "Only deliveries in transit can be marked as delivered.");
        }

        delivery.setStatus(DeliveryStatus.DELIVERED);
        delivery.setDeliveredTime(LocalDateTime.now());

        deliveryRepository.save(delivery);

        return "Delivery completed successfully.";
    }

    @Override
    public String updateAvailability(
            UpdateAvailabilityRequest request) {

        if (request.getAvailable() == null) {
            throw new IllegalArgumentException(
                    "Availability value is required.");
        }

        Volunteer volunteer = getCurrentVolunteer();

        volunteer.setAvailable(request.getAvailable());

        volunteerRepository.save(volunteer);

        return request.getAvailable()
                ? "Volunteer is now available."
                : "Volunteer is now unavailable.";
    }

    @Override
    @Transactional(readOnly = true)
    public List<VolunteerDeliveryResponse> getDeliveryHistory() {

        Volunteer volunteer = getCurrentVolunteer();

        return deliveryRepository.findByVolunteer(volunteer)
                .stream()
                .filter(delivery ->
                        delivery.getStatus() == DeliveryStatus.DELIVERED
                                ||
                        delivery.getStatus() == DeliveryStatus.CANCELLED)
                .map(this::mapToDeliveryResponse)
                .toList();
    }

    private User getCurrentUser() {

        UserResponse currentUser = authService.getCurrentUser();

        return userRepository.findById(currentUser.getId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found."));
    }

    private Volunteer getCurrentVolunteer() {

        User user = getCurrentUser();

        return volunteerRepository.findByUser(user)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Volunteer profile not found."));
    }

    private Delivery getVolunteerDelivery(
            Long deliveryId,
            Volunteer volunteer) {

        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Delivery not found."));

        if (!delivery.getVolunteer()
                .getId()
                .equals(volunteer.getId())) {

            throw new IllegalArgumentException(
                    "You are not authorized to access this delivery.");
        }

        return delivery;
    }

    private VolunteerDeliveryResponse mapToDeliveryResponse(
            Delivery delivery) {

        DonationAllocation allocation =
                delivery.getAllocation();

        DonationRequest donationRequest =
                allocation.getDonationRequest();

        FoodDonation donation =
                donationRequest.getDonation();

        return VolunteerDeliveryResponse.builder()
                .deliveryId(delivery.getId())
                .donationId(donation.getId())
                .restaurantName(
                        donation.getRestaurant()
                                .getRestaurantName())
                .ngoName(
                        donationRequest.getNgo()
                                .getNgoName())
                .pickupAddress(donation.getPickupAddress())
                .status(delivery.getStatus())
                .assignedAt(delivery.getAssignedAt())
                .build();
    }
}
