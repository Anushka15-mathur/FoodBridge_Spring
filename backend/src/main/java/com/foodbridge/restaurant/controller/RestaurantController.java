package com.foodbridge.restaurant.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodbridge.restaurant.dto.ApproveRequestDto;
import com.foodbridge.restaurant.dto.RejectRequestDto;
import com.foodbridge.restaurant.dto.RestaurantDashboardResponse;
import com.foodbridge.restaurant.dto.RestaurantProfileResponse;
import com.foodbridge.restaurant.dto.RestaurantRequestResponse;
import com.foodbridge.restaurant.service.RestaurantService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/restaurant")
@RequiredArgsConstructor
@PreAuthorize("hasRole('RESTAURANT')")
public class RestaurantController {

    private final RestaurantService restaurantService;

    @GetMapping("/profile")
    public ResponseEntity<RestaurantProfileResponse> getProfile() {
        return ResponseEntity.ok(
                restaurantService.getProfile()
        );
    }

    @GetMapping("/dashboard")
    public ResponseEntity<RestaurantDashboardResponse> getDashboard() {
        return ResponseEntity.ok(
                restaurantService.getDashboard()
        );
    }

    @GetMapping("/requests")
    public ResponseEntity<List<RestaurantRequestResponse>> getDonationRequests() {
        return ResponseEntity.ok(
                restaurantService.getDonationRequests()
        );
    }

    @PutMapping("/requests/{requestId}/approve")
    public ResponseEntity<String> approveDonationRequest(
            @PathVariable Long requestId,
            @RequestBody(required = false) ApproveRequestDto request) {

        return ResponseEntity.ok(
                restaurantService.approveDonationRequest(
                        requestId,
                        request
                )
        );
    }

    @PutMapping("/requests/{requestId}/reject")
    public ResponseEntity<String> rejectDonationRequest(
            @PathVariable Long requestId,
            @RequestBody(required = false) RejectRequestDto request) {

        return ResponseEntity.ok(
                restaurantService.rejectDonationRequest(
                        requestId,
                        request
                )
        );
    }
}