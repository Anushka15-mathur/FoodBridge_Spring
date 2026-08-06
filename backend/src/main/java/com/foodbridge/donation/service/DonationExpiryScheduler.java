package com.foodbridge.donation.service;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DonationExpiryScheduler {

    private final DonationExpiryService donationExpiryService;

    @EventListener(ApplicationReadyEvent.class)
    public void expireDonationsOnStartup() {
        donationExpiryService.expireDonations();
    }

    @Scheduled(fixedDelayString = "${foodbridge.donations.expiry-check-interval-ms:60000}")
    public void expireDonationsPeriodically() {
        donationExpiryService.expireDonations();
    }
}
