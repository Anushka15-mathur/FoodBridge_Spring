package com.foodbridge.volunteer.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.foodbridge.profile.dto.request.VolunteerProfileRequest;
import com.foodbridge.volunteer.dto.UpdateAvailabilityRequest;
import com.foodbridge.volunteer.dto.VolunteerDashboardResponse;
import com.foodbridge.volunteer.dto.VolunteerDeliveryResponse;
import com.foodbridge.volunteer.dto.VolunteerProfileResponse;
import com.foodbridge.volunteer.service.VolunteerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/volunteer")
@RequiredArgsConstructor
@PreAuthorize("hasRole('VOLUNTEER')")
public class VolunteerController {

    private final VolunteerService volunteerService;

    @GetMapping("/profile")
    public ResponseEntity<VolunteerProfileResponse> getProfile() {

        return ResponseEntity.ok(
                volunteerService.getProfile());
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(
            @Valid @RequestBody VolunteerProfileRequest request) {

        return ResponseEntity.ok(
                volunteerService.updateProfile(request));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<VolunteerDashboardResponse> getDashboard() {

        return ResponseEntity.ok(
                volunteerService.getDashboard());
    }

    @GetMapping("/deliveries")
    public ResponseEntity<List<VolunteerDeliveryResponse>> getAssignedDeliveries() {

        return ResponseEntity.ok(
                volunteerService.getAssignedDeliveries());
    }

    @GetMapping("/deliveries/{deliveryId}")
    public ResponseEntity<VolunteerDeliveryResponse> getDeliveryDetails(
            @PathVariable Long deliveryId) {

        return ResponseEntity.ok(
                volunteerService.getDeliveryDetails(deliveryId));
    }

    @PutMapping("/deliveries/{deliveryId}/pickup")
    public ResponseEntity<String> markPickup(
            @PathVariable Long deliveryId) {

        return ResponseEntity.ok(
                volunteerService.markPickup(deliveryId));
    }

    @PutMapping("/deliveries/{deliveryId}/transit")
    public ResponseEntity<String> markInTransit(
            @PathVariable Long deliveryId) {

        return ResponseEntity.ok(
                volunteerService.markInTransit(deliveryId));
    }

    @PutMapping("/deliveries/{deliveryId}/delivered")
    public ResponseEntity<String> markDelivered(
            @PathVariable Long deliveryId) {

        return ResponseEntity.ok(
                volunteerService.markDelivered(deliveryId));
    }

    @PutMapping("/availability")
    public ResponseEntity<String> updateAvailability(
            @Valid @RequestBody UpdateAvailabilityRequest request) {

        return ResponseEntity.ok(
                volunteerService.updateAvailability(request));
    }

    @GetMapping("/history")
    public ResponseEntity<List<VolunteerDeliveryResponse>> getDeliveryHistory() {

        return ResponseEntity.ok(
                volunteerService.getDeliveryHistory());
    }
}
