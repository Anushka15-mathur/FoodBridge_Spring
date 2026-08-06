package com.foodbridge.donor.controller;

import com.foodbridge.donor.dto.request.DonorFoodDonationRequest;
import com.foodbridge.donor.dto.response.DonorFoodDonationResponse;
import com.foodbridge.donor.enums.DonorDonationStatus;
import com.foodbridge.donor.services.DonorFoodDonationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donor/donations/food")
@RequiredArgsConstructor
@PreAuthorize("hasRole('DONOR')")
public class DonorFoodDonationController {
    private final DonorFoodDonationService donorFoodDonationService;

    @GetMapping
    public ResponseEntity<List<DonorFoodDonationResponse>> getAll(
            @RequestParam(required = false) DonorDonationStatus status) {

        return ResponseEntity.ok(donorFoodDonationService.getAll(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonorFoodDonationResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(donorFoodDonationService.getById(id));
    }

    @PostMapping
    public ResponseEntity<DonorFoodDonationResponse> create(
            @Valid @RequestBody DonorFoodDonationRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(donorFoodDonationService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonorFoodDonationResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody DonorFoodDonationRequest request) {

        return ResponseEntity.ok(donorFoodDonationService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        donorFoodDonationService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
