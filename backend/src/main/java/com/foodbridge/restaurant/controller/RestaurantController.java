package com.foodbridge.restaurant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodbridge.restaurant.dto.RestaurantRequestResponse;
import com.foodbridge.restaurant.service.RestaurantService;

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
}