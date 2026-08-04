package com.foodbridge.donation.service;

import java.util.List;

import com.foodbridge.donation.dto.CreateDonationDto;
import com.foodbridge.donation.dto.UpdateDonationDto;
import com.foodbridge.donation.dto.DonationResponseDto;

public interface RestaurantDonationService {

    DonationResponseDto createDonation(CreateDonationDto request);

    DonationResponseDto updateDonation(Long donationId, UpdateDonationDto request);

    String deleteDonation(Long donationId);

    List<DonationResponseDto> getDonationHistoryForRestaurant();

    DonationResponseDto addImage(Long donationId, String imageUrl);

    String removeImage(Long imageId);

}
