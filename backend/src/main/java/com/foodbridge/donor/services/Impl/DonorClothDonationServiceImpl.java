package com.foodbridge.donor.services.Impl;

import com.foodbridge.donor.dto.request.DonorClothDonationRequest;
import com.foodbridge.donor.dto.response.DonorClothDonationResponse;
import com.foodbridge.donor.entity.Donor;
import com.foodbridge.donor.entity.DonorClothDonation;
import com.foodbridge.donor.enums.DonorDonationStatus;
import com.foodbridge.donor.mapper.DonorDonationMapper;
import com.foodbridge.donor.repository.DonorClothDonationRepository;
import com.foodbridge.donor.services.DonorClothDonationService;
import com.foodbridge.donor.services.DonorContextService;
import com.foodbridge.donor.validator.DonorDonationValidator;
import com.foodbridge.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@Service
@RequiredArgsConstructor
@org.springframework.transaction.annotation.Transactional
public class DonorClothDonationServiceImpl implements DonorClothDonationService {

    private final DonorContextService donorContextService;
    private final DonorClothDonationRepository donorClothDonationRepository;
    private final DonorDonationMapper donorDonationMapper;
    private final DonorDonationValidator donorDonationValidator;

    @Override
    @Transactional(readOnly = true)
    public List<DonorClothDonationResponse> getAll(DonorDonationStatus status) {

        Donor donor = donorContextService.getCurrentDonor();

        List<DonorClothDonation> donations = (status == null)
                ? donorClothDonationRepository
                .findByDonorAndIsDeletedFalseOrderByCreatedAtDesc(donor)
                : donorClothDonationRepository
                .findByDonorAndStatusAndIsDeletedFalseOrderByCreatedAtDesc(
                        donor, status);

        return donorDonationMapper.toClothResponseList(donations);
    }

    @Override
    @Transactional(readOnly = true)
    public DonorClothDonationResponse getById(Long id) {

        return donorDonationMapper.toClothResponse(findOwnedDonation(id));
    }

    @Override
    public DonorClothDonationResponse create(DonorClothDonationRequest request) {

        donorDonationValidator.validateClothDonation(request);

        Donor donor = donorContextService.getCurrentDonor();

        DonorClothDonation donation = DonorClothDonation.builder()
                .donor(donor)
                .clothType(request.getClothType().trim())
                .category(request.getCategory())
                .quantity(request.getQuantity())
                .clothCondition(request.getClothCondition())
                .pickupAddress(request.getPickupAddress().trim())
                .description(request.getDescription())
                .status(request.getStatus() != null
                        ? request.getStatus()
                        : DonorDonationStatus.PENDING)
                .isDeleted(false)
                .build();

        return donorDonationMapper.toClothResponse(
                donorClothDonationRepository.save(donation));
    }

    @Override
    public DonorClothDonationResponse update(
            Long id,
            DonorClothDonationRequest request) {

        donorDonationValidator.validateClothDonation(request);

        DonorClothDonation donation = findOwnedDonation(id);

        donorDonationValidator.validateStatusTransition(
                donation.getStatus(),
                request.getStatus());

        donation.setClothType(request.getClothType().trim());
        donation.setCategory(request.getCategory());
        donation.setQuantity(request.getQuantity());
        donation.setClothCondition(request.getClothCondition());
        donation.setPickupAddress(request.getPickupAddress().trim());
        donation.setDescription(request.getDescription());

        if (request.getStatus() != null) {
            donation.setStatus(request.getStatus());
        }

        return donorDonationMapper.toClothResponse(
                donorClothDonationRepository.save(donation));
    }

    @Override
    public void delete(Long id) {

        DonorClothDonation donation = findOwnedDonation(id);

        donation.setIsDeleted(true);

        donorClothDonationRepository.save(donation);
    }

    private DonorClothDonation findOwnedDonation(Long id) {

        Donor donor = donorContextService.getCurrentDonor();

        return donorClothDonationRepository
                .findByIdAndDonorAndIsDeletedFalse(id, donor)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cloth donation not found with id: " + id));
    }
}
