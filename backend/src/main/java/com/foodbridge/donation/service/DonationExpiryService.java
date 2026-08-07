package com.foodbridge.donation.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.EnumSet;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.foodbridge.donation.entity.FoodDonation;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.donation.enums.DonationType;
import com.foodbridge.donation.repository.FoodDonationRepository;

import lombok.RequiredArgsConstructor;

/**
 * Owns the single definition of whether a donation can still be requested and
 * transitions open donations to EXPIRED once their expiry time is reached.
 */
@Service
@RequiredArgsConstructor
public class DonationExpiryService {

    private static final Set<DonationStatus> REQUESTABLE_STATUSES = EnumSet.of(
            DonationStatus.AVAILABLE,
            DonationStatus.PARTIALLY_ALLOCATED);

    private static final Set<DonationStatus> EXPIRABLE_STATUSES = EnumSet.of(
            DonationStatus.AVAILABLE,
            DonationStatus.REQUESTED,
            DonationStatus.PARTIALLY_ALLOCATED,
            DonationStatus.FULLY_ALLOCATED);

    private final FoodDonationRepository foodDonationRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public int expireDonations() {
        return foodDonationRepository.markExpiredDonations(
                LocalDateTime.now(),
                DonationType.FOOD,
                DonationStatus.EXPIRED,
                EXPIRABLE_STATUSES);
    }

    public boolean isRequestable(FoodDonation donation) {
        return donation != null
                && Boolean.FALSE.equals(donation.getIsDeleted())
                && REQUESTABLE_STATUSES.contains(donation.getStatus())
                && donation.getRemainingQuantity() != null
                && donation.getRemainingQuantity().compareTo(BigDecimal.ZERO) > 0
                && donation.getExpiryTime() != null
                && donation.getExpiryTime().isAfter(LocalDateTime.now());
    }

    public Set<DonationStatus> getRequestableStatuses() {
        return REQUESTABLE_STATUSES;
    }
}
