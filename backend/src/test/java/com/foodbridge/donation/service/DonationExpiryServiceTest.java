package com.foodbridge.donation.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.EnumSet;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.foodbridge.donation.entity.FoodDonation;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.donation.repository.FoodDonationRepository;

@ExtendWith(MockitoExtension.class)
class DonationExpiryServiceTest {

    @Mock
    private FoodDonationRepository foodDonationRepository;

    @InjectMocks
    private DonationExpiryService donationExpiryService;

    @Test
    void marksEveryOpenExpiredDonationStatusAsExpired() {
        when(foodDonationRepository.markExpiredDonations(
                any(LocalDateTime.class),
                eq(DonationStatus.EXPIRED),
                any(Collection.class)))
                .thenReturn(3);

        int expiredCount = donationExpiryService.expireDonations();

        ArgumentCaptor<Collection<DonationStatus>> statuses =
                ArgumentCaptor.forClass(Collection.class);
        verify(foodDonationRepository).markExpiredDonations(
                any(LocalDateTime.class),
                eq(DonationStatus.EXPIRED),
                statuses.capture());

        assertEquals(3, expiredCount);
        assertEquals(
                EnumSet.of(
                        DonationStatus.AVAILABLE,
                        DonationStatus.REQUESTED,
                        DonationStatus.PARTIALLY_ALLOCATED,
                        DonationStatus.FULLY_ALLOCATED),
                EnumSet.copyOf(statuses.getValue()));
    }

    @Test
    void onlyReturnsUnexpiredOpenDonationsAsRequestable() {
        LocalDateTime future = LocalDateTime.now().plusMinutes(30);
        LocalDateTime past = LocalDateTime.now().minusMinutes(1);

        assertTrue(donationExpiryService.isRequestable(
                donation(DonationStatus.AVAILABLE, future, BigDecimal.ONE)));
        assertTrue(donationExpiryService.isRequestable(
                donation(DonationStatus.PARTIALLY_ALLOCATED, future, BigDecimal.ONE)));
        assertFalse(donationExpiryService.isRequestable(
                donation(DonationStatus.AVAILABLE, past, BigDecimal.ONE)));
        assertFalse(donationExpiryService.isRequestable(
                donation(DonationStatus.EXPIRED, future, BigDecimal.ONE)));
        assertFalse(donationExpiryService.isRequestable(
                donation(DonationStatus.FULLY_ALLOCATED, future, BigDecimal.ONE)));
        assertFalse(donationExpiryService.isRequestable(
                donation(DonationStatus.AVAILABLE, future, BigDecimal.ZERO)));
    }

    private FoodDonation donation(
            DonationStatus status,
            LocalDateTime expiryTime,
            BigDecimal remainingQuantity) {

        FoodDonation donation = new FoodDonation();
        donation.setStatus(status);
        donation.setExpiryTime(expiryTime);
        donation.setRemainingQuantity(remainingQuantity);
        donation.setIsDeleted(false);
        return donation;
    }
}
