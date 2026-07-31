package com.foodbridge.ngo.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DonationRequestDto {

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal requestedQuantity;

    private String requestMessage;
}