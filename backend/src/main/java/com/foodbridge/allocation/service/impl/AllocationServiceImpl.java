package com.foodbridge.allocation.service.impl;

import java.math.BigDecimal;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbridge.allocation.dto.AllocationRequestDto;
import com.foodbridge.allocation.dto.AllocationResponseDto;
import com.foodbridge.allocation.entity.DonationAllocation;
import com.foodbridge.allocation.entity.DonationRequest;
import com.foodbridge.allocation.enums.AllocationStatus;
import com.foodbridge.allocation.enums.DonationRequestStatus;
import com.foodbridge.allocation.mapper.DonationAllocationMapper;
import com.foodbridge.allocation.repository.DonationAllocationRepository;
import com.foodbridge.allocation.repository.DonationRequestRepository;
import com.foodbridge.allocation.service.AllocationService;
import com.foodbridge.donation.entity.FoodDonation;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.donation.service.DonationExpiryService;
import com.foodbridge.exception.BadRequestException;
import com.foodbridge.exception.ResourceNotFoundException;
import com.foodbridge.user.entity.User;
import com.foodbridge.user.enums.Role;
import com.foodbridge.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AllocationServiceImpl implements AllocationService {

    private final DonationRequestRepository donationRequestRepository;

    private final UserRepository userRepository;
    
    private final DonationAllocationRepository donationAllocationRepository;
    
    private final DonationAllocationMapper donationAllocationMapper;

    private final DonationExpiryService donationExpiryService;
    
    @Override
    public AllocationResponseDto allocateDonation(AllocationRequestDto requestDto) {

        donationExpiryService.expireDonations();

    	//validate request
        DonationRequest donationRequest = donationRequestRepository
                .findById(requestDto.getRequestId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Donation request not found."));

        if (donationRequest.getStatus() != DonationRequestStatus.PENDING) {
            throw new BadRequestException(
                    "Only pending donation requests can be allocated.");
        }
        
        
        // Validate donation
        FoodDonation donation = donationRequest.getDonation();

        if (donation == null) {
            throw new ResourceNotFoundException("Food donation not found.");
        }

        if (!donationExpiryService.isRequestable(donation)) {
            throw new BadRequestException(
                    "Donation is no longer available for allocation.");
        }

        if (donation.getRemainingQuantity()
                .compareTo(requestDto.getAllocatedQuantity()) < 0) {

            throw new BadRequestException(
                    "Requested quantity exceeds the available quantity.");
        }

        
        //Get logged-in admin
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        User admin = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admin user not found."));

        if (admin.getRole() != Role.ADMIN) {
            throw new BadRequestException(
                    "Only administrators can allocate donations.");
        }
        
        
        //Creating Donation Allocation
        DonationAllocation allocation = DonationAllocation.builder()
                .donationRequest(donationRequest)
                .allocatedBy(admin)
                .allocatedQuantity(requestDto.getAllocatedQuantity())
                .status(AllocationStatus.ALLOCATED)
                .adminRemarks(requestDto.getAdminRemarks())
                .build();

        
        //Saving Donation
        DonationAllocation savedAllocation =
                donationAllocationRepository.save(allocation);
        
        //Updating remaining quantity
        BigDecimal remainingQuantity = donation.getRemainingQuantity()
                .subtract(requestDto.getAllocatedQuantity());

        donation.setRemainingQuantity(remainingQuantity);
        
        
        //Update Donation Status
        if (remainingQuantity.compareTo(BigDecimal.ZERO) == 0) {

            donation.setStatus(DonationStatus.FULLY_ALLOCATED);

        } else {

            donation.setStatus(DonationStatus.PARTIALLY_ALLOCATED);
        }

        
        //Approve Request
        donationRequest.setStatus(DonationRequestStatus.APPROVED);
        
        
        //Convert to Response Dto
        AllocationResponseDto response =
                donationAllocationMapper.toResponseDto(savedAllocation);

        response.setMessage("Donation allocated successfully.");

        return response;

  
    }
}
