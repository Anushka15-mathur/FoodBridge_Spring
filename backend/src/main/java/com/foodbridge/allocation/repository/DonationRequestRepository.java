package com.foodbridge.allocation.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbridge.allocation.entity.DonationRequest;
import com.foodbridge.allocation.enums.DonationRequestStatus;
import com.foodbridge.donation.entity.FoodDonation;
import com.foodbridge.ngo.entity.Ngo;

import com.foodbridge.restaurant.entity.Restaurant;

public interface DonationRequestRepository extends JpaRepository<DonationRequest, Long> {

    List<DonationRequest> findByDonation(FoodDonation donation);

    List<DonationRequest> findByNgo(Ngo ngo);

    List<DonationRequest> findByStatus(DonationRequestStatus status);

    Optional<DonationRequest> findByDonationAndNgo(FoodDonation donation, Ngo ngo);

    boolean existsByDonationAndNgo(FoodDonation donation, Ngo ngo);

    long countByNgoAndStatus(Ngo ngo, DonationRequestStatus status);

    long countByNgo(Ngo ngo);

    List<DonationRequest> findByDonation_Restaurant(Restaurant restaurant);
}
