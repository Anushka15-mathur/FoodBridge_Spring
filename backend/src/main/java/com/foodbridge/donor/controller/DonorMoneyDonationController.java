package com.foodbridge.donor.controller;
import com.foodbridge.donor.dto.request.DonorMoneyDonationRequest;
import com.foodbridge.donor.dto.response.DonorMoneyDonationResponse;
import com.foodbridge.donor.enums.DonorDonationStatus;
import com.foodbridge.donor.services.DonorMoneyDonationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donor/donations/money")
@RequiredArgsConstructor
@PreAuthorize("hasRole('DONOR')")
public class DonorMoneyDonationController {
    private final DonorMoneyDonationService donorMoneyDonationService;

    @GetMapping
    public ResponseEntity<List<DonorMoneyDonationResponse>> getAll(
            @RequestParam(required = false) DonorDonationStatus status) {

        return ResponseEntity.ok(donorMoneyDonationService.getAll(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonorMoneyDonationResponse> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(donorMoneyDonationService.getById(id));
    }

    @PostMapping
    public ResponseEntity<DonorMoneyDonationResponse> create(
            @Valid @RequestBody DonorMoneyDonationRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(donorMoneyDonationService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonorMoneyDonationResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody DonorMoneyDonationRequest request) {

        return ResponseEntity.ok(donorMoneyDonationService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        donorMoneyDonationService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
