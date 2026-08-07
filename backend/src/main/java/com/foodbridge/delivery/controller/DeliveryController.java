package com.foodbridge.delivery.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.foodbridge.delivery.dto.AssignDeliveryRequestDto;
import com.foodbridge.delivery.dto.DeliveryResponseDto;
import com.foodbridge.delivery.dto.OtpRequestDto;
import com.foodbridge.delivery.service.DeliveryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/deliveries")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class DeliveryController {

    private final DeliveryService deliveryService;

    @PostMapping("/assign")
    public ResponseEntity<DeliveryResponseDto> assignVolunteer(
            @Valid @RequestBody AssignDeliveryRequestDto request) {

        return ResponseEntity.ok(deliveryService.assignVolunteer(request));
    }

    @PostMapping("/{id}/pickup")
    public ResponseEntity<DeliveryResponseDto> verifyPickup(
            @PathVariable Long id,
            @Valid @RequestBody OtpRequestDto otp) {

        return ResponseEntity.ok(deliveryService.verifyPickup(id, otp));
    }

    @PostMapping("/{id}/deliver")
    public ResponseEntity<DeliveryResponseDto> verifyDelivery(
            @PathVariable Long id,
            @Valid @RequestBody OtpRequestDto otp) {

        return ResponseEntity.ok(deliveryService.verifyDelivery(id, otp));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryResponseDto> getDelivery(@PathVariable Long id) {
        return ResponseEntity.ok(deliveryService.getDelivery(id));
    }
}
