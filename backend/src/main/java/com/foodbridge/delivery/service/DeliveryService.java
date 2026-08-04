package com.foodbridge.delivery.service;

import com.foodbridge.delivery.dto.AssignDeliveryRequestDto;
import com.foodbridge.delivery.dto.DeliveryResponseDto;
import com.foodbridge.delivery.dto.OtpRequestDto;

public interface DeliveryService {
    DeliveryResponseDto assignVolunteer(AssignDeliveryRequestDto request);

    DeliveryResponseDto verifyPickup(Long deliveryId, OtpRequestDto otpRequest);

    DeliveryResponseDto verifyDelivery(Long deliveryId, OtpRequestDto otpRequest);

    DeliveryResponseDto getDelivery(Long deliveryId);
}
