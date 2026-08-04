package com.foodbridge.delivery.dto;

import java.time.LocalDateTime;

import com.foodbridge.delivery.enums.DeliveryStatus;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryResponseDto {
    private Long id;
    private Long allocationId;
    private Long volunteerId;
    private DeliveryStatus status;
    private LocalDateTime assignedAt;
    private LocalDateTime pickupTime;
    private LocalDateTime deliveredTime;
}
