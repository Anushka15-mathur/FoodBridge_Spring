package com.foodbridge.donor.services.Impl;

import com.foodbridge.donor.dto.request.DonorFoodDonationRequest;
import com.foodbridge.donor.dto.response.DonorFoodDonationResponse;
import com.foodbridge.donor.entity.Donor;
import com.foodbridge.donor.entity.DonorFoodDonation;
import com.foodbridge.donor.enums.DonorDonationStatus;
import com.foodbridge.donor.mapper.DonorDonationMapper;
import com.foodbridge.donor.repository.DonorFoodDonationRepository;
import com.foodbridge.donor.services.DonorContextService;
import com.foodbridge.donor.services.DonorFoodDonationService;
import com.foodbridge.donor.validator.DonorDonationValidator;
import com.foodbridge.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DonorFoodDonationServiceImpl implements DonorFoodDonationService {

    private final DonorContextService donorContextService;
    private final DonorFoodDonationRepository donorFoodDonationRepository;
    private final DonorDonationMapper donorDonationMapper;
    private final DonorDonationValidator donorDonationValidator;

    @Override
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<DonorFoodDonationResponse> getAll(DonorDonationStatus status) {

        Donor donor = donorContextService.getCurrentDonor();

        List<DonorFoodDonation> donations = (status == null)
                ? donorFoodDonationRepository
                .findByDonorAndIsDeletedFalseOrderByCreatedAtDesc(donor)
                : donorFoodDonationRepository
                .findByDonorAndStatusAndIsDeletedFalseOrderByCreatedAtDesc(
                        donor, status);

        return donorDonationMapper.toFoodResponseList(donations);
    }

    @Override
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public DonorFoodDonationResponse getById(Long id) {

        return donorDonationMapper.toFoodResponse(findOwnedDonation(id));
    }

    @Override
    public DonorFoodDonationResponse create(DonorFoodDonationRequest request) {

        donorDonationValidator.validateFoodDonation(request);

        Donor donor = donorContextService.getCurrentDonor();

        DonorFoodDonation donation = DonorFoodDonation.builder()
                .donor(donor)
                .foodName(request.getFoodName().trim())
                .quantity(request.getQuantity())
                .unit(request.getUnit())
                .freshUntil(request.getFreshUntil())
                .pickupAddress(request.getPickupAddress().trim())
                .description(request.getDescription())
                .status(request.getStatus() != null
                        ? request.getStatus()
                        : DonorDonationStatus.PENDING)
                .isDeleted(false)
                .build();

        return donorDonationMapper.toFoodResponse(
                donorFoodDonationRepository.save(donation));
    }

    @Override
    public DonorFoodDonationResponse update(
            Long id,
            DonorFoodDonationRequest request) {

        donorDonationValidator.validateFoodDonation(request);

        DonorFoodDonation donation = findOwnedDonation(id);

        donorDonationValidator.validateStatusTransition(
                donation.getStatus(),
                request.getStatus());

        donation.setFoodName(request.getFoodName().trim());
        donation.setQuantity(request.getQuantity());
        donation.setUnit(request.getUnit());
        donation.setFreshUntil(request.getFreshUntil());
        donation.setPickupAddress(request.getPickupAddress().trim());
        donation.setDescription(request.getDescription());

        if (request.getStatus() != null) {
            donation.setStatus(request.getStatus());
        }

        return donorDonationMapper.toFoodResponse(
                donorFoodDonationRepository.save(donation));
    }

    @Override
    public void delete(Long id) {

        DonorFoodDonation donation = findOwnedDonation(id);

        donation.setIsDeleted(true);

        donorFoodDonationRepository.save(donation);
    }

    private DonorFoodDonation findOwnedDonation(Long id) {

        Donor donor = donorContextService.getCurrentDonor();

        return donorFoodDonationRepository
                .findByIdAndDonorAndIsDeletedFalse(id, donor)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Food donation not found with id: " + id));
    }
}
