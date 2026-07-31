package com.foodbridge.ngo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodbridge.ngo.dto.NgoDashboardResponse;
import com.foodbridge.ngo.service.NgoService;

import java.util.List;
import com.foodbridge.ngo.dto.DonationCardResponse;

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
}