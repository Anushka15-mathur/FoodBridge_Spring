package com.foodbridge.allocation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.foodbridge.allocation.enums.AllocationStatus;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllocationResponseDto {

    private Long allocationId;

    private Long donationId;

    private Long requestId;

    private String ngoName;

    private BigDecimal allocatedQuantity;

    private AllocationStatus allocationStatus;

    private String adminRemarks;

    private LocalDateTime allocatedAt;

    private String message;
}