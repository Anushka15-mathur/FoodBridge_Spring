package com.foodbridge.ngo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodbridge.ngo.dto.NgoDashboardResponse;
import com.foodbridge.ngo.service.NgoService;

import java.util.List;
import com.foodbridge.ngo.dto.DonationCardResponse;

import com.foodbridge.ngo.dto.DonationRequestDto;
import jakarta.validation.Valid;

import com.foodbridge.ngo.dto.MyDonationRequestResponse;
import com.foodbridge.ngo.dto.DonationDetailsResponse;

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
}