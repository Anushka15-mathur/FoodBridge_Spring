package com.foodbridge.donor.validator;

import com.foodbridge.donor.dto.request.DonorClothDonationRequest;
import com.foodbridge.donor.dto.request.DonorFoodDonationRequest;
import com.foodbridge.donor.dto.request.DonorMoneyDonationRequest;
import com.foodbridge.donor.enums.DonorDonationStatus;
import com.foodbridge.donor.enums.PaymentMode;
import com.foodbridge.exception.BadRequestException;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DonorDonationValidator {
    public void validateFoodDonation(DonorFoodDonationRequest request) {

        if (request.getFreshUntil() == null
                || !request.getFreshUntil().isAfter(LocalDateTime.now())) {
            throw new BadRequestException(
                    "Fresh until must be a future date and time.");
        }

        if (request.getPickupAddress() == null
                || request.getPickupAddress().trim().length() < 5) {
            throw new BadRequestException(
                    "Pickup address must be at least 5 characters long.");
        }
    }

    public void validateMoneyDonation(DonorMoneyDonationRequest request) {

        boolean referenceRequired =
                request.getPaymentMode() != null
                        && request.getPaymentMode() != PaymentMode.CASH;

        boolean referenceMissing =
                request.getTransactionReference() == null
                        || request.getTransactionReference().isBlank();

        if (referenceRequired && referenceMissing) {
            throw new BadRequestException(
                    "Transaction reference is required for "
                            + request.getPaymentMode().name()
                            + " payments.");
        }
    }

    public void validateClothDonation(DonorClothDonationRequest request) {

        if (request.getPickupAddress() == null
                || request.getPickupAddress().trim().length() < 5) {
            throw new BadRequestException(
                    "Pickup address must be at least 5 characters long.");
        }
    }

    public void validateStatusTransition(
            DonorDonationStatus currentStatus,
            DonorDonationStatus newStatus) {

        if (newStatus == null || currentStatus == newStatus) {
            return;
        }

        if (currentStatus == DonorDonationStatus.COMPLETED) {
            throw new BadRequestException(
                    "A completed donation can no longer be updated.");
        }

        if (currentStatus == DonorDonationStatus.CANCELLED) {
            throw new BadRequestException(
                    "A cancelled donation can no longer be updated.");
        }
    }
}
