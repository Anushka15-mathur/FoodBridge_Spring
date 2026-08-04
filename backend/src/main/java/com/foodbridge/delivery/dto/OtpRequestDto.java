package com.foodbridge.delivery.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OtpRequestDto {
    @NotBlank
    private String otp;
}
