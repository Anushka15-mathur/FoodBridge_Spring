package com.foodbridge.donor.services;

import com.foodbridge.donor.dto.request.DonorClothDonationRequest;
import com.foodbridge.donor.dto.response.DonorClothDonationResponse;
import com.foodbridge.donor.enums.DonorDonationStatus;

import java.util.List;

public interface DonorClothDonationService {

    List<DonorClothDonationResponse> getAll(DonorDonationStatus status);

    DonorClothDonationResponse getById(Long id);

    DonorClothDonationResponse create(DonorClothDonationRequest request);

    DonorClothDonationResponse update(Long id, DonorClothDonationRequest request);

    void delete(Long id);
}
