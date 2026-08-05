package com.foodbridge.volunteer.dto;

import java.time.LocalDateTime;

import com.foodbridge.delivery.enums.DeliveryStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VolunteerDeliveryResponse {

    private Long deliveryId;

    private Long donationId;

    private String restaurantName;

    private String ngoName;

    private String pickupAddress;

    private DeliveryStatus status;

    private LocalDateTime assignedAt;
}