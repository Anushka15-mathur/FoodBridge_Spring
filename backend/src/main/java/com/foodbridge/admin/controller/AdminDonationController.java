package com.foodbridge.admin.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodbridge.donation.repository.FoodDonationRepository;
import com.foodbridge.donation.entity.FoodDonation;
import com.foodbridge.donation.service.DonationExpiryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/donations")
@RequiredArgsConstructor
public class AdminDonationController {

    private final FoodDonationRepository foodDonationRepository;
    private final DonationExpiryService donationExpiryService;

    @GetMapping
    public ResponseEntity<List<Object>> getAllDonations() {

        donationExpiryService.expireDonations();

        List<FoodDonation> list = foodDonationRepository.findAll();

        List<Object> resp = list.stream().map(d -> {
            return new Object() {
                public final Long id = d.getId();
                public final String title = d.getTitle();
                public final String donationType = d.getDonationType().name();
                public final String ownerType = d.getRestaurant() != null ? "RESTAURANT" : "DONOR";
                public final String owner = d.getRestaurant() != null ? d.getRestaurant().getRestaurantName()
                        : d.getDonor().getUser().getFirstName() + " " + d.getDonor().getUser().getLastName();
                public final String restaurant = d.getRestaurant() != null ? d.getRestaurant().getRestaurantName() : null;
                public final Object quantity = d.getQuantity();
                public final Object amount = d.getAmount();
                public final Object currency = d.getCurrency();
                public final Object remainingQuantity = d.getRemainingQuantity();
                public final Object expiryTime = d.getExpiryTime();
                public final Object status = d.getStatus();
            };
        }).collect(Collectors.toList());

        return ResponseEntity.ok(resp);
    }
}
