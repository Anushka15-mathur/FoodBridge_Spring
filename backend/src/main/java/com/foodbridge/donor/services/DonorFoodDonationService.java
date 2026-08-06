package com.foodbridge.donor.services;

import com.foodbridge.donor.dto.request.DonorFoodDonationRequest;
import com.foodbridge.donor.dto.response.DonorFoodDonationResponse;
import com.foodbridge.donor.enums.DonorDonationStatus;

import java.util.List;

public interface DonorFoodDonationService {

    List<DonorFoodDonationResponse> getAll(DonorDonationStatus status);

    DonorFoodDonationResponse getById(Long id);

    DonorFoodDonationResponse create(DonorFoodDonationRequest request);

    DonorFoodDonationResponse update(Long id, DonorFoodDonationRequest request);

    void delete(Long id);
}
