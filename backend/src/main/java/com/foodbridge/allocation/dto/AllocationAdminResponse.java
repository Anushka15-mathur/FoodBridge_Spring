package com.foodbridge.allocation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.foodbridge.allocation.enums.AllocationStatus;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllocationAdminResponse {
    private Long allocationId;
    private Long donationId;
    private String donationTitle;
    private String restaurantName;
    private String ngoName;
    private BigDecimal allocatedQuantity;
    private AllocationStatus status;
    private LocalDateTime allocatedAt;
}
