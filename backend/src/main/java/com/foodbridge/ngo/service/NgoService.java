package com.foodbridge.ngo.service;

import java.util.List;

import com.foodbridge.ngo.dto.DonationCardResponse;
import com.foodbridge.ngo.dto.DonationDetailsResponse;
import com.foodbridge.ngo.dto.DonationRequestDto;
import com.foodbridge.ngo.dto.MyDonationRequestResponse;
import com.foodbridge.ngo.dto.NgoDashboardResponse;
import com.foodbridge.ngo.dto.NgoProfileResponse;
import com.foodbridge.ngo.dto.UpdateNgoProfileDto;

public interface NgoService {

    NgoDashboardResponse getDashboard();

    List<DonationCardResponse> getAvailableDonations();

    String requestDonation(Long donationId, DonationRequestDto request);

    List<MyDonationRequestResponse> getMyDonationRequests();

    DonationDetailsResponse getDonationDetails(Long donationId);

    String cancelDonationRequest(Long requestId);

    NgoProfileResponse getProfile();

    String updateProfile(UpdateNgoProfileDto request);
}