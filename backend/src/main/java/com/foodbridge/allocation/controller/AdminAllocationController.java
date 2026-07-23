package com.foodbridge.allocation.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import com.foodbridge.allocation.dto.AllocationRequestDto;
import com.foodbridge.allocation.dto.AllocationResponseDto;
import com.foodbridge.allocation.service.AllocationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/allocations")
@RequiredArgsConstructor
public class AdminAllocationController {

    private final AllocationService allocationService;

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
    
}