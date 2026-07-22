package com.foodbridge.restaurant.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbridge.restaurant.entity.Restaurant;
import com.foodbridge.user.entity.User;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    Optional<Restaurant> findByUser(User user);

    boolean existsByLicenseNumber(String licenseNumber);

    boolean existsByRestaurantName(String restaurantName);

    Optional<Restaurant> findByPlaceId(String placeId);

}