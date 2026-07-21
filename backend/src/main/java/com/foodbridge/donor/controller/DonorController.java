package com.foodbridge.donor.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DonorController {

    @GetMapping("/api/donor/dashboard")
    @PreAuthorize("hasRole('DONOR')")
    public String donorDashboard() {

        return "Welcome Donor!";
    }
}