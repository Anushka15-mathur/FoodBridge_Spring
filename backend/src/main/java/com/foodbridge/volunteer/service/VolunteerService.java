package com.foodbridge.volunteer.service;

import java.util.List;

import com.foodbridge.volunteer.dto.UpdateAvailabilityRequest;
import com.foodbridge.volunteer.dto.VolunteerDashboardResponse;
import com.foodbridge.volunteer.dto.VolunteerDeliveryResponse;
import com.foodbridge.volunteer.dto.VolunteerProfileResponse;
import com.foodbridge.profile.dto.request.VolunteerProfileRequest;

public interface VolunteerService {

    // Profile

    VolunteerProfileResponse getProfile();

    String updateProfile(VolunteerProfileRequest request);

    // Dashboard
    VolunteerDashboardResponse getDashboard();

    // Deliveries
    List<VolunteerDeliveryResponse> getAssignedDeliveries();

    VolunteerDeliveryResponse getDeliveryDetails(Long deliveryId);

    String markPickup(Long deliveryId);

    String markInTransit(Long deliveryId);

    String markDelivered(Long deliveryId);

    // Availability
    String updateAvailability(UpdateAvailabilityRequest request);

    // History
    List<VolunteerDeliveryResponse> getDeliveryHistory();
}