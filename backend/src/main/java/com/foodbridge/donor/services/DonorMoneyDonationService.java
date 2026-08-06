package com.foodbridge.donor.services;

import com.foodbridge.donor.dto.request.DonorMoneyDonationRequest;
import com.foodbridge.donor.dto.response.DonorMoneyDonationResponse;
import com.foodbridge.donor.enums.DonorDonationStatus;

import java.util.List;

public interface DonorMoneyDonationService {

    List<DonorMoneyDonationResponse> getAll(DonorDonationStatus status);

    DonorMoneyDonationResponse getById(Long id);

    DonorMoneyDonationResponse create(DonorMoneyDonationRequest request);

    DonorMoneyDonationResponse update(Long id, DonorMoneyDonationRequest request);

    void delete(Long id);
}
