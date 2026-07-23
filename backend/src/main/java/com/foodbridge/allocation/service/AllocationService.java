package com.foodbridge.allocation.service;

import com.foodbridge.allocation.dto.AllocationRequestDto;
import com.foodbridge.allocation.dto.AllocationResponseDto;

public interface AllocationService {

    AllocationResponseDto allocateDonation(AllocationRequestDto requestDto);

}