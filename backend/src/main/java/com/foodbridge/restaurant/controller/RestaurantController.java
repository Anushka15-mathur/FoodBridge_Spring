package com.foodbridge.restaurant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodbridge.restaurant.dto.RestaurantRequestResponse;
import com.foodbridge.restaurant.service.RestaurantService;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.foodbridge.restaurant.dto.ApproveRequestDto;

import com.foodbridge.restaurant.dto.RejectRequestDto;

@RestController
@RequestMapping("/api/restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/requests")
    public ResponseEntity<List<RestaurantRequestResponse>> getDonationRequests() {

        return ResponseEntity.ok(
                restaurantService.getDonationRequests());
    }

    @PutMapping("/requests/{requestId}/approve")
public ResponseEntity<String> approveDonationRequest(
        @PathVariable Long requestId,
        @RequestBody ApproveRequestDto request) {

    return ResponseEntity.ok(
            restaurantService.approveDonationRequest(requestId, request));
}

@PutMapping("/requests/{requestId}/reject")
public ResponseEntity<String> rejectDonationRequest(
        @PathVariable Long requestId,
        @RequestBody RejectRequestDto request) {

    return ResponseEntity.ok(
            restaurantService.rejectDonationRequest(requestId, request));
}
}