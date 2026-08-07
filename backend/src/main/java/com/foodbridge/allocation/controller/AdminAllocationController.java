package com.foodbridge.allocation.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import com.foodbridge.allocation.dto.AllocationRequestDto;
import com.foodbridge.allocation.dto.AllocationResponseDto;
import com.foodbridge.allocation.service.AllocationService;
import com.foodbridge.allocation.dto.DonationRequestAdminResponse;
import com.foodbridge.allocation.dto.AllocationAdminResponse;
import com.foodbridge.allocation.repository.DonationRequestRepository;
import com.foodbridge.allocation.repository.DonationAllocationRepository;
import com.foodbridge.donation.service.DonationExpiryService;

import java.util.List;
import java.util.stream.Collectors;

import com.foodbridge.allocation.entity.DonationRequest;
import com.foodbridge.allocation.entity.DonationAllocation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/allocations")
@RequiredArgsConstructor
public class AdminAllocationController {

    private final AllocationService allocationService;

	private final DonationRequestRepository donationRequestRepository;

	private final DonationAllocationRepository donationAllocationRepository;

    private final DonationExpiryService donationExpiryService;

    @Operation(
    	    summary = "Allocate food donation",
    	    description = "Allows an administrator to allocate a food donation request."
    	)
    	@ApiResponse(responseCode = "201", description = "Donation allocated successfully")
    	@ApiResponse(responseCode = "400", description = "Invalid allocation request")
    	@ApiResponse(responseCode = "404", description = "Donation request not found")
    	@PreAuthorize("hasRole('ADMIN')")
    	@PostMapping
    	public ResponseEntity<AllocationResponseDto> allocateDonation(
    	        @Valid @RequestBody AllocationRequestDto requestDto) {

    	    AllocationResponseDto response =
    	            allocationService.allocateDonation(requestDto);

    	    return ResponseEntity
    	            .status(HttpStatus.CREATED)
    	            .body(response);
    	}

		    @GetMapping("/requests")
		    public ResponseEntity<List<DonationRequestAdminResponse>> getAllRequests() {

			donationExpiryService.expireDonations();

			List<DonationRequest> requests = donationRequestRepository
					.findByStatus(com.foodbridge.allocation.enums.DonationRequestStatus.PENDING)
					.stream()
					.filter(request -> donationExpiryService.isRequestable(request.getDonation()))
					.toList();

			List<DonationRequestAdminResponse> response = requests.stream()
				.map(r -> DonationRequestAdminResponse.builder()
					.requestId(r.getId())
					.donationId(r.getDonation().getId())
					.donationTitle(r.getDonation().getTitle())
					.restaurantName(r.getDonation().getRestaurant() != null ? r.getDonation().getRestaurant().getRestaurantName()
							: r.getDonation().getDonor().getUser().getFirstName() + " " + r.getDonation().getDonor().getUser().getLastName())
					.ngoName(r.getNgo().getNgoName())
					.requestedQuantity(r.getRequestedQuantity())
					.status(r.getStatus())
					.requestedAt(r.getRequestedAt())
					.build())
				.collect(Collectors.toList());

			return ResponseEntity.ok(response);
		    }

		    @GetMapping("/history")
		    public ResponseEntity<List<AllocationAdminResponse>> getAllocationHistory() {

			List<DonationAllocation> allocations = donationAllocationRepository.findAll();

			List<AllocationAdminResponse> response = allocations.stream()
				.map(a -> AllocationAdminResponse.builder()
					.allocationId(a.getId())
					.donationId(a.getDonationRequest().getDonation().getId())
					.donationTitle(a.getDonationRequest().getDonation().getTitle())
					.restaurantName(a.getDonationRequest().getDonation().getRestaurant() != null ? a.getDonationRequest().getDonation().getRestaurant().getRestaurantName()
							: a.getDonationRequest().getDonation().getDonor().getUser().getFirstName() + " " + a.getDonationRequest().getDonation().getDonor().getUser().getLastName())
					.ngoName(a.getDonationRequest().getNgo().getNgoName())
					.allocatedQuantity(a.getAllocatedQuantity())
					.status(a.getStatus())
					.allocatedAt(a.getAllocatedAt())
					.build())
				.collect(Collectors.toList());

			return ResponseEntity.ok(response);
		    }
    
}
