package com.foodbridge.donor.controller;

import com.foodbridge.donor.dto.response.DonorDashboardResponse;
import com.foodbridge.donor.services.DonorDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/donor")
@RequiredArgsConstructor
@PreAuthorize("hasRole('DONOR')")
public class DonorController {

    private final DonorDashboardService donorDashboardService;

    @GetMapping("/dashboard")
    public ResponseEntity<DonorDashboardResponse> getDashboard() {

        return ResponseEntity.ok(donorDashboardService.getDashboard());
    }

}