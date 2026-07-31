package com.foodbridge.ngo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodbridge.ngo.dto.NgoDashboardResponse;
import com.foodbridge.ngo.service.NgoService;

@RestController
@RequestMapping("/api/ngo")
public class NgoController {

    @Autowired
    private NgoService ngoService;

    @GetMapping("/dashboard")
    public ResponseEntity<NgoDashboardResponse> getDashboard() {
        return ResponseEntity.ok(ngoService.getDashboard());
    }
}