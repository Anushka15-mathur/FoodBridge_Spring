package com.foodbridge.donation.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodbridge.donation.dto.CreateDonationRequest;
import com.foodbridge.donation.dto.DonationResponse;
import com.foodbridge.donation.dto.UpdateDonationRequest;
import com.foodbridge.donation.dto.DonorDashboardResponse;
import com.foodbridge.donation.service.DonationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('RESTAURANT', 'DONOR')")
public class DonationController {

    private final DonationService donationService;

    @PostMapping
    public ResponseEntity<DonationResponse> createDonation(
            @Valid @RequestBody CreateDonationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(donationService.createDonation(request));
    }

    @GetMapping("/my")
    public ResponseEntity<List<DonationResponse>> getMyDonations() {
        return ResponseEntity.ok(donationService.getMyDonations());
    }

    @GetMapping("/donor-dashboard")
    @PreAuthorize("hasRole('DONOR')")
    public ResponseEntity<DonorDashboardResponse> getDonorDashboard() {
        return ResponseEntity.ok(donationService.getDonorDashboard());
    }

    @GetMapping("/{donationId}")
    public ResponseEntity<DonationResponse> getDonation(
            @PathVariable Long donationId) {
        return ResponseEntity.ok(donationService.getDonation(donationId));
    }

    @PutMapping("/{donationId}")
    public ResponseEntity<DonationResponse> updateDonation(
            @PathVariable Long donationId,
            @Valid @RequestBody UpdateDonationRequest request) {
        return ResponseEntity.ok(
                donationService.updateDonation(donationId, request));
    }

    @DeleteMapping("/{donationId}")
    public ResponseEntity<Void> deleteDonation(
            @PathVariable Long donationId) {
        donationService.deleteDonation(donationId);
        return ResponseEntity.noContent().build();
    }
}
