package com.foodbridge.restaurant.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodbridge.donation.dto.CreateDonationDto;
import com.foodbridge.donation.dto.UpdateDonationDto;
import com.foodbridge.donation.dto.DonationResponseDto;
import com.foodbridge.donation.service.RestaurantDonationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/restaurant/donations")
@RequiredArgsConstructor
public class RestaurantDonationController {

    private final RestaurantDonationService donationService;

    @PostMapping
    public ResponseEntity<DonationResponseDto> createDonation(
            @Valid @RequestBody CreateDonationDto request) {

        DonationResponseDto response = donationService.createDonation(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonationResponseDto> updateDonation(
            @PathVariable Long id,
            @Valid @RequestBody UpdateDonationDto request) {

        DonationResponseDto response = donationService.updateDonation(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDonation(@PathVariable Long id) {
        return ResponseEntity.ok(donationService.deleteDonation(id));
    }

    @GetMapping("/history")
    public ResponseEntity<List<DonationResponseDto>> getHistory() {
        return ResponseEntity.ok(donationService.getDonationHistoryForRestaurant());
    }

    @PostMapping("/{id}/images")
    public ResponseEntity<DonationResponseDto> addImage(
            @PathVariable("id") Long donationId,
            @RequestBody String imageUrl) {

        return ResponseEntity.ok(donationService.addImage(donationId, imageUrl));
    }

    @DeleteMapping("/images/{imageId}")
    public ResponseEntity<String> deleteImage(@PathVariable Long imageId) {
        return ResponseEntity.ok(donationService.removeImage(imageId));
    }
}
