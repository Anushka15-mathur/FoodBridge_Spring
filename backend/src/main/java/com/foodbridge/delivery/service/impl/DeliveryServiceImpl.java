package com.foodbridge.delivery.service.impl;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbridge.allocation.entity.DonationAllocation;
import com.foodbridge.allocation.repository.DonationAllocationRepository;
import com.foodbridge.delivery.dto.AssignDeliveryRequestDto;
import com.foodbridge.delivery.dto.DeliveryResponseDto;
import com.foodbridge.delivery.dto.OtpRequestDto;
import com.foodbridge.delivery.entity.Delivery;
import com.foodbridge.delivery.enums.DeliveryStatus;
import com.foodbridge.delivery.repository.DeliveryRepository;
import com.foodbridge.delivery.service.DeliveryService;
import com.foodbridge.exception.ResourceNotFoundException;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.volunteer.entity.Volunteer;
import com.foodbridge.volunteer.repository.VolunteerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class DeliveryServiceImpl implements DeliveryService {

    private final DonationAllocationRepository allocationRepository;

    private final VolunteerRepository volunteerRepository;

    private final DeliveryRepository deliveryRepository;

    private final Random random = new Random();

    @Override
    public DeliveryResponseDto assignVolunteer(AssignDeliveryRequestDto request) {

        DonationAllocation allocation = allocationRepository.findById(request.getAllocationId())
                .orElseThrow(() -> new ResourceNotFoundException("Allocation not found."));

        Volunteer volunteer = volunteerRepository.findById(request.getVolunteerId())
                .orElseThrow(() -> new ResourceNotFoundException("Volunteer not found."));

        if (deliveryRepository.findByAllocation(allocation).isPresent()) {
            throw new IllegalArgumentException("Delivery already assigned for this allocation.");
        }

        String pickupOtp = String.format("%06d", random.nextInt(1_000_000));
        String deliveryOtp = String.format("%06d", random.nextInt(1_000_000));

        Delivery delivery = Delivery.builder()
                .allocation(allocation)
                .volunteer(volunteer)
                .status(DeliveryStatus.ASSIGNED)
                .pickupOtp(pickupOtp)
                .deliveryOtp(deliveryOtp)
                .pickupOtpExpiry(LocalDateTime.now().plusMinutes(60))
                .deliveryOtpExpiry(LocalDateTime.now().plusHours(12))
                .build();

        Delivery saved = deliveryRepository.save(delivery);

        return toDto(saved);
    }

    @Override
    public DeliveryResponseDto verifyPickup(Long deliveryId, OtpRequestDto otpRequest) {

        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found."));

        if (delivery.getPickupVerified()) {
            throw new IllegalArgumentException("Pickup already verified.");
        }

        if (delivery.getPickupOtpExpiry() != null && LocalDateTime.now().isAfter(delivery.getPickupOtpExpiry())) {
            throw new IllegalArgumentException("Pickup OTP expired.");
        }

        if (!delivery.getPickupOtp().equals(otpRequest.getOtp())) {
            throw new IllegalArgumentException("Invalid OTP.");
        }

        delivery.setPickupVerified(true);
        delivery.setPickupTime(LocalDateTime.now());
        delivery.setStatus(DeliveryStatus.PICKED_UP);

        Delivery saved = deliveryRepository.save(delivery);

        return toDto(saved);
    }

    @Override
    public DeliveryResponseDto verifyDelivery(Long deliveryId, OtpRequestDto otpRequest) {

        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found."));

        if (delivery.getDeliveryVerified()) {
            throw new IllegalArgumentException("Delivery already verified.");
        }

        if (delivery.getDeliveryOtpExpiry() != null && LocalDateTime.now().isAfter(delivery.getDeliveryOtpExpiry())) {
            throw new IllegalArgumentException("Delivery OTP expired.");
        }

        if (!delivery.getDeliveryOtp().equals(otpRequest.getOtp())) {
            throw new IllegalArgumentException("Invalid OTP.");
        }

        delivery.setDeliveryVerified(true);
        delivery.setDeliveredTime(LocalDateTime.now());
        delivery.setStatus(DeliveryStatus.DELIVERED);

        // A food donation becomes delivered only when its final allocation is delivered.
        if (delivery.getAllocation().getDonationRequest().getDonation().getStatus()
                == DonationStatus.FULLY_ALLOCATED) {
            delivery.getAllocation().getDonationRequest().getDonation()
                    .setStatus(DonationStatus.DELIVERED);
        }

        Delivery saved = deliveryRepository.save(delivery);

        return toDto(saved);
    }

    @Override
    public DeliveryResponseDto getDelivery(Long deliveryId) {

        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found."));

        return toDto(delivery);
    }

    private DeliveryResponseDto toDto(Delivery d) {
        return DeliveryResponseDto.builder()
                .id(d.getId())
                .allocationId(d.getAllocation().getId())
                .volunteerId(d.getVolunteer().getId())
                .status(d.getStatus())
                .assignedAt(d.getAssignedAt())
                .pickupTime(d.getPickupTime())
                .deliveredTime(d.getDeliveredTime())
                .build();
    }
}
