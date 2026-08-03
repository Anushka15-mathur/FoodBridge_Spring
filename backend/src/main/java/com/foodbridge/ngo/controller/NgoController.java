package com.foodbridge.ngo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodbridge.ngo.dto.DonationCardResponse;
import com.foodbridge.ngo.dto.DonationDetailsResponse;
import com.foodbridge.ngo.dto.DonationRequestDto;
import com.foodbridge.ngo.dto.MyDonationRequestResponse;
import com.foodbridge.ngo.dto.NgoDashboardResponse;
import com.foodbridge.ngo.service.NgoService;

import jakarta.validation.Valid;

import com.foodbridge.ngo.dto.NgoProfileResponse;
import com.foodbridge.ngo.dto.UpdateNgoProfileDto;

@RestController
@RequestMapping("/api/ngo")
public class NgoController {

    @Autowired
    private NgoService ngoService;

    @GetMapping("/dashboard")
    public ResponseEntity<NgoDashboardResponse> getDashboard() {
        return ResponseEntity.ok(ngoService.getDashboard());
    }

    @GetMapping("/donations")
    public ResponseEntity<List<DonationCardResponse>> getAvailableDonations() {
    return ResponseEntity.ok(
            ngoService.getAvailableDonations());
    }
    @PostMapping("/donations/{donationId}/request")
    public ResponseEntity<String> requestDonation(
        @PathVariable Long donationId,
        @Valid @RequestBody DonationRequestDto request) {

        return ResponseEntity.ok(
            ngoService.requestDonation(donationId, request));
    }

    @GetMapping("/requests")
    public ResponseEntity<List<MyDonationRequestResponse>> getMyDonationRequests() {

    return ResponseEntity.ok(
            ngoService.getMyDonationRequests());
    }

    @GetMapping("/donations/{donationId}")
public ResponseEntity<DonationDetailsResponse> getDonationDetails(
        @PathVariable Long donationId) {

    return ResponseEntity.ok(
            ngoService.getDonationDetails(donationId));
}

@PutMapping("/requests/{requestId}/cancel")
public ResponseEntity<String> cancelDonationRequest(
        @PathVariable Long requestId) {

    return ResponseEntity.ok(
            ngoService.cancelDonationRequest(requestId));
}

@GetMapping("/profile")
public ResponseEntity<NgoProfileResponse> getProfile() {

    return ResponseEntity.ok(
            ngoService.getProfile());
}
@PutMapping("/profile")
public ResponseEntity<String> updateProfile(
        @Valid @RequestBody UpdateNgoProfileDto request) {

    return ResponseEntity.ok(
            ngoService.updateProfile(request));
}
}