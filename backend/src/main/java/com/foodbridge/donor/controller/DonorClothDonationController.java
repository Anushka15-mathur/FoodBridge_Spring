package com.foodbridge.donor.controller;

import com.foodbridge.donor.dto.request.DonorClothDonationRequest;
import com.foodbridge.donor.dto.response.DonorClothDonationResponse;
import com.foodbridge.donor.enums.DonorDonationStatus;
import com.foodbridge.donor.services.DonorClothDonationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donor/donations/cloth")
@RequiredArgsConstructor
@PreAuthorize("hasRole('DONOR')")
public class DonorClothDonationController {
    private final DonorClothDonationService donorClothDonationService;

    @GetMapping
    public ResponseEntity<List<DonorClothDonationResponse>> getAll(
            @RequestParam(required = false) DonorDonationStatus status) {

        return ResponseEntity.ok(donorClothDonationService.getAll(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonorClothDonationResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(donorClothDonationService.getById(id));
    }

    @PostMapping
    public ResponseEntity<DonorClothDonationResponse> create(
            @Valid @RequestBody DonorClothDonationRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(donorClothDonationService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonorClothDonationResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody DonorClothDonationRequest request) {

        return ResponseEntity.ok(donorClothDonationService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        donorClothDonationService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
