package com.foodbridge.delivery.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignDeliveryRequestDto {
    @NotNull
    private Long allocationId;

    @NotNull
    private Long volunteerId;
}
