package com.foodbridge.donation.service;

import java.util.List;

import com.foodbridge.donation.dto.CreateDonationRequest;
import com.foodbridge.donation.dto.DonationResponse;
import com.foodbridge.donation.dto.UpdateDonationRequest;
import com.foodbridge.donation.dto.DonorDashboardResponse;

public interface DonationService {

    DonationResponse createDonation(CreateDonationRequest request);

    List<DonationResponse> getMyDonations();

    DonationResponse getDonation(Long donationId);

    DonationResponse updateDonation(Long donationId, UpdateDonationRequest request);

    void deleteDonation(Long donationId);

    DonorDashboardResponse getDonorDashboard();
}
