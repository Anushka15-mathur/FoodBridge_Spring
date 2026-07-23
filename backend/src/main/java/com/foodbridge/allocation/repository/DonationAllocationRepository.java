package com.foodbridge.allocation.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbridge.allocation.entity.DonationAllocation;
import com.foodbridge.allocation.entity.DonationRequest;
import com.foodbridge.allocation.enums.AllocationStatus;

public interface DonationAllocationRepository extends JpaRepository<DonationAllocation, Long> {

    Optional<DonationAllocation> findByDonationRequest(DonationRequest donationRequest);

    List<DonationAllocation> findByStatus(AllocationStatus status);

    boolean existsByDonationRequest(DonationRequest donationRequest);

}