package com.foodbridge.allocation.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.foodbridge.allocation.dto.AllocationResponseDto;
import com.foodbridge.allocation.entity.DonationAllocation;

@Mapper(componentModel = "spring")
public interface DonationAllocationMapper {

    @Mapping(source = "id", target = "allocationId")
    @Mapping(source = "donationRequest.id", target = "requestId")
    @Mapping(source = "donationRequest.donation.id", target = "donationId")
    @Mapping(source = "donationRequest.ngo.ngoName", target = "ngoName")
    @Mapping(source = "status", target = "allocationStatus")
    AllocationResponseDto toResponseDto(DonationAllocation allocation);

}