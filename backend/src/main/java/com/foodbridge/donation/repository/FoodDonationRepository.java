package com.foodbridge.donation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbridge.donation.entity.FoodDonation;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.restaurant.entity.Restaurant;

public interface FoodDonationRepository extends JpaRepository<FoodDonation, Long> {

    List<FoodDonation> findByRestaurant(Restaurant restaurant);

    List<FoodDonation> findByStatus(DonationStatus status);

    List<FoodDonation> findByRestaurantAndStatus(Restaurant restaurant,
                                                 DonationStatus status);

    long countByStatus(DonationStatus status);
}
