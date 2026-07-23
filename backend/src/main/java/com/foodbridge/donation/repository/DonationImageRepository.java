package com.foodbridge.donation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbridge.donation.entity.DonationImage;
import com.foodbridge.donation.entity.FoodDonation;

public interface DonationImageRepository extends JpaRepository<DonationImage, Long> {

    List<DonationImage> findByDonation(FoodDonation donation);

}