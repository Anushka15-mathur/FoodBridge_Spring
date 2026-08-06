package com.foodbridge.donor.services.Impl;

import com.foodbridge.donor.dto.request.DonorMoneyDonationRequest;
import com.foodbridge.donor.dto.response.DonorMoneyDonationResponse;
import com.foodbridge.donor.entity.Donor;
import com.foodbridge.donor.entity.DonorMoneyDonation;
import com.foodbridge.donor.enums.DonorDonationStatus;
import com.foodbridge.donor.mapper.DonorDonationMapper;
import com.foodbridge.donor.repository.DonorMoneyDonationRepository;
import com.foodbridge.donor.services.DonorContextService;
import com.foodbridge.donor.services.DonorMoneyDonationService;
import com.foodbridge.donor.validator.DonorDonationValidator;
import com.foodbridge.exception.DuplicateResourceException;
import com.foodbridge.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class DonorMoneyDonationServiceImpl implements DonorMoneyDonationService {

    private final DonorContextService donorContextService;
    private final DonorMoneyDonationRepository donorMoneyDonationRepository;
    private final DonorDonationMapper donorDonationMapper;
    private final DonorDonationValidator donorDonationValidator;

    @Override
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<DonorMoneyDonationResponse> getAll(DonorDonationStatus status) {

        Donor donor = donorContextService.getCurrentDonor();

        List<DonorMoneyDonation> donations = (status == null)
                ? donorMoneyDonationRepository
                .findByDonorAndIsDeletedFalseOrderByCreatedAtDesc(donor)
                : donorMoneyDonationRepository
                .findByDonorAndStatusAndIsDeletedFalseOrderByCreatedAtDesc(
                        donor, status);

        return donorDonationMapper.toMoneyResponseList(donations);
    }

    @Override
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public DonorMoneyDonationResponse getById(Long id) {

        return donorDonationMapper.toMoneyResponse(findOwnedDonation(id));
    }

    @Override
    public DonorMoneyDonationResponse create(DonorMoneyDonationRequest request) {

        donorDonationValidator.validateMoneyDonation(request);

        String reference = normalizeReference(request.getTransactionReference());

        if (reference != null
                && donorMoneyDonationRepository
                .existsByTransactionReferenceAndIsDeletedFalse(reference)) {
            throw new DuplicateResourceException(
                    "A donation with this transaction reference already exists.");
        }

        Donor donor = donorContextService.getCurrentDonor();

        DonorMoneyDonation donation = DonorMoneyDonation.builder()
                .donor(donor)
                .amount(request.getAmount())
                .paymentMode(request.getPaymentMode())
                .transactionReference(reference)
                .description(request.getDescription())
                .status(request.getStatus() != null
                        ? request.getStatus()
                        : DonorDonationStatus.PENDING)
                .isDeleted(false)
                .build();

        return donorDonationMapper.toMoneyResponse(
                donorMoneyDonationRepository.save(donation));
    }

    @Override
    public DonorMoneyDonationResponse update(
            Long id,
            DonorMoneyDonationRequest request) {

        donorDonationValidator.validateMoneyDonation(request);

        DonorMoneyDonation donation = findOwnedDonation(id);

        donorDonationValidator.validateStatusTransition(
                donation.getStatus(),
                request.getStatus());

        String reference = normalizeReference(request.getTransactionReference());

        if (reference != null
                && donorMoneyDonationRepository
                .existsByTransactionReferenceAndIdNotAndIsDeletedFalse(
                        reference, id)) {
            throw new DuplicateResourceException(
                    "A donation with this transaction reference already exists.");
        }

        donation.setAmount(request.getAmount());
        donation.setPaymentMode(request.getPaymentMode());
        donation.setTransactionReference(reference);
        donation.setDescription(request.getDescription());

        if (request.getStatus() != null) {
            donation.setStatus(request.getStatus());
        }

        return donorDonationMapper.toMoneyResponse(
                donorMoneyDonationRepository.save(donation));
    }

    @Override
    public void delete(Long id) {

        DonorMoneyDonation donation = findOwnedDonation(id);

        donation.setIsDeleted(true);

        donorMoneyDonationRepository.save(donation);
    }

    private DonorMoneyDonation findOwnedDonation(Long id) {

        Donor donor = donorContextService.getCurrentDonor();

        return donorMoneyDonationRepository
                .findByIdAndDonorAndIsDeletedFalse(id, donor)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Money donation not found with id: " + id));
    }

    private String normalizeReference(String reference) {

        if (reference == null || reference.isBlank()) {
            return null;
        }

        return reference.trim();
    }
}
