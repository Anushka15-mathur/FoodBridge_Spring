package com.foodbridge.allocation.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AllocationRequestDto {

    @NotNull(message = "Donation request ID is required")
    private Long requestId;

    @NotNull(message = "Allocated quantity is required")
    @DecimalMin(value = "0.01", message = "Allocated quantity must be greater than zero")
    private BigDecimal allocatedQuantity;

    @Size(max = 500, message = "Remarks cannot exceed 500 characters")
    private String adminRemarks;
}