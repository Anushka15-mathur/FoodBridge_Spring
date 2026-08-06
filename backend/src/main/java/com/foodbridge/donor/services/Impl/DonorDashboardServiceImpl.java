package com.foodbridge.donor.services.Impl;

import com.foodbridge.donor.dto.response.DonorDashboardResponse;
import com.foodbridge.donor.dto.response.DonorDonationStatisticsResponse;
import com.foodbridge.donor.dto.response.DonorMonthlyDonationResponse;
import com.foodbridge.donor.dto.response.DonorRecentDonationResponse;
import com.foodbridge.donor.entity.Donor;
import com.foodbridge.donor.entity.DonorClothDonation;
import com.foodbridge.donor.entity.DonorFoodDonation;
import com.foodbridge.donor.entity.DonorMoneyDonation;
import com.foodbridge.donor.enums.DonorDonationStatus;
import com.foodbridge.donor.enums.DonorDonationType;
import com.foodbridge.donor.repository.DonorClothDonationRepository;
import com.foodbridge.donor.repository.DonorFoodDonationRepository;
import com.foodbridge.donor.repository.DonorMoneyDonationRepository;
import com.foodbridge.donor.services.DonorContextService;
import com.foodbridge.donor.services.DonorDashboardService;
import com.foodbridge.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DonorDashboardServiceImpl implements DonorDashboardService {

    private static final int RECENT_DONATION_LIMIT = 10;
    private static final int MONTHLY_CHART_MONTHS = 12;

    private final DonorContextService donorContextService;
    private final DonorFoodDonationRepository donorFoodDonationRepository;
    private final DonorMoneyDonationRepository donorMoneyDonationRepository;
    private final DonorClothDonationRepository donorClothDonationRepository;

    @Override
    public DonorDashboardResponse getDashboard() {

        Donor donor = donorContextService.getCurrentDonor();

        List<DonorFoodDonation> foodDonations = donorFoodDonationRepository
                .findByDonorAndIsDeletedFalseOrderByCreatedAtDesc(donor);

        List<DonorMoneyDonation> moneyDonations = donorMoneyDonationRepository
                .findByDonorAndIsDeletedFalseOrderByCreatedAtDesc(donor);

        List<DonorClothDonation> clothDonations = donorClothDonationRepository
                .findByDonorAndIsDeletedFalseOrderByCreatedAtDesc(donor);

        long foodCount = foodDonations.size();
        long moneyCount = moneyDonations.size();
        long clothCount = clothDonations.size();
        long totalDonations = foodCount + moneyCount + clothCount;

        List<DonorDonationStatus> allStatuses = new ArrayList<>();
        foodDonations.forEach(donation -> allStatuses.add(donation.getStatus()));
        moneyDonations.forEach(donation -> allStatuses.add(donation.getStatus()));
        clothDonations.forEach(donation -> allStatuses.add(donation.getStatus()));

        long pendingCount = countStatus(allStatuses, DonorDonationStatus.PENDING);
        long scheduledCount = countStatus(allStatuses, DonorDonationStatus.SCHEDULED);
        long pickedUpCount = countStatus(allStatuses, DonorDonationStatus.PICKED_UP);
        long completedCount = countStatus(allStatuses, DonorDonationStatus.COMPLETED);
        long cancelledCount = countStatus(allStatuses, DonorDonationStatus.CANCELLED);

        long activeDonations = pendingCount + scheduledCount + pickedUpCount;

        long pendingPickups = foodDonations.stream()
                .filter(donation -> isAwaitingPickup(donation.getStatus()))
                .count()
                + clothDonations.stream()
                .filter(donation -> isAwaitingPickup(donation.getStatus()))
                .count();

        BigDecimal totalAmountDonated = moneyDonations.stream()
                .filter(donation -> donation.getStatus() != DonorDonationStatus.CANCELLED)
                .map(DonorMoneyDonation::getAmount)
                .filter(java.util.Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(2, RoundingMode.HALF_UP);

        BigDecimal totalFoodQuantity = foodDonations.stream()
                .filter(donation -> donation.getStatus() != DonorDonationStatus.CANCELLED)
                .map(DonorFoodDonation::getQuantity)
                .filter(java.util.Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .setScale(2, RoundingMode.HALF_UP);

        long totalClothPieces = clothDonations.stream()
                .filter(donation -> donation.getStatus() != DonorDonationStatus.CANCELLED)
                .map(DonorClothDonation::getQuantity)
                .filter(java.util.Objects::nonNull)
                .mapToLong(Integer::longValue)
                .sum();

        DonorDonationStatisticsResponse statistics =
                DonorDonationStatisticsResponse.builder()
                        .pendingCount(pendingCount)
                        .scheduledCount(scheduledCount)
                        .pickedUpCount(pickedUpCount)
                        .completedCount(completedCount)
                        .cancelledCount(cancelledCount)
                        .foodPercentage(percentage(foodCount, totalDonations))
                        .moneyPercentage(percentage(moneyCount, totalDonations))
                        .clothPercentage(percentage(clothCount, totalDonations))
                        .totalAmountDonated(totalAmountDonated)
                        .totalFoodQuantity(totalFoodQuantity)
                        .totalClothPieces(totalClothPieces)
                        .build();

        return DonorDashboardResponse.builder()
                .donorName(resolveDonorName(donor))
                .totalDonations(totalDonations)
                .foodDonations(foodCount)
                .moneyDonations(moneyCount)
                .clothDonations(clothCount)
                .activeDonations(activeDonations)
                .completedDonations(completedCount)
                .pendingPickups(pendingPickups)
                .recentDonations(buildRecentDonations(
                        foodDonations, moneyDonations, clothDonations))
                .statistics(statistics)
                .monthlyChart(buildMonthlyChart(
                        foodDonations, moneyDonations, clothDonations))
                .build();
    }

    private long countStatus(
            List<DonorDonationStatus> statuses,
            DonorDonationStatus status) {

        return statuses.stream()
                .filter(current -> current == status)
                .count();
    }

    private boolean isAwaitingPickup(DonorDonationStatus status) {

        return status == DonorDonationStatus.PENDING
                || status == DonorDonationStatus.SCHEDULED;
    }

    private double percentage(long part, long total) {

        if (total == 0) {
            return 0.0;
        }

        return BigDecimal.valueOf(part * 100.0 / total)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }

    private String resolveDonorName(Donor donor) {

        if (Boolean.TRUE.equals(donor.getOrganization())
                && donor.getOrganizationName() != null
                && !donor.getOrganizationName().isBlank()) {
            return donor.getOrganizationName();
        }

        User user = donor.getUser();

        if (user == null) {
            return "Donor";
        }

        String firstName = user.getFirstName() != null ? user.getFirstName() : "";
        String lastName = user.getLastName() != null ? user.getLastName() : "";

        String fullName = (firstName + " " + lastName).trim();

        return fullName.isEmpty() ? "Donor" : fullName;
    }

    private List<DonorRecentDonationResponse> buildRecentDonations(
            List<DonorFoodDonation> foodDonations,
            List<DonorMoneyDonation> moneyDonations,
            List<DonorClothDonation> clothDonations) {

        List<DonorRecentDonationResponse> recent = new ArrayList<>();

        for (DonorFoodDonation donation : foodDonations) {
            recent.add(DonorRecentDonationResponse.builder()
                    .id(donation.getId())
                    .type(DonorDonationType.FOOD)
                    .title(donation.getFoodName())
                    .quantityLabel(donation.getQuantity()
                            + " " + donation.getUnit().name())
                    .amount(null)
                    .status(donation.getStatus())
                    .createdAt(donation.getCreatedAt())
                    .build());
        }

        for (DonorMoneyDonation donation : moneyDonations) {
            recent.add(DonorRecentDonationResponse.builder()
                    .id(donation.getId())
                    .type(DonorDonationType.MONEY)
                    .title(donation.getPaymentMode().name() + " Payment")
                    .quantityLabel(null)
                    .amount(donation.getAmount())
                    .status(donation.getStatus())
                    .createdAt(donation.getCreatedAt())
                    .build());
        }

        for (DonorClothDonation donation : clothDonations) {
            recent.add(DonorRecentDonationResponse.builder()
                    .id(donation.getId())
                    .type(DonorDonationType.CLOTHES)
                    .title(donation.getClothType())
                    .quantityLabel(donation.getQuantity() + " PIECES")
                    .amount(null)
                    .status(donation.getStatus())
                    .createdAt(donation.getCreatedAt())
                    .build());
        }

        return recent.stream()
                .filter(item -> item.getCreatedAt() != null)
                .sorted(Comparator.comparing(
                        DonorRecentDonationResponse::getCreatedAt).reversed())
                .limit(RECENT_DONATION_LIMIT)
                .toList();
    }

    private List<DonorMonthlyDonationResponse> buildMonthlyChart(
            List<DonorFoodDonation> foodDonations,
            List<DonorMoneyDonation> moneyDonations,
            List<DonorClothDonation> clothDonations) {

        YearMonth currentMonth = YearMonth.now();

        List<DonorMonthlyDonationResponse> chart = new ArrayList<>();

        for (int offset = MONTHLY_CHART_MONTHS - 1; offset >= 0; offset--) {

            YearMonth bucket = currentMonth.minusMonths(offset);

            long foodCount = foodDonations.stream()
                    .filter(donation -> inMonth(donation.getCreatedAt(), bucket))
                    .count();

            long moneyCount = moneyDonations.stream()
                    .filter(donation -> inMonth(donation.getCreatedAt(), bucket))
                    .count();

            long clothCount = clothDonations.stream()
                    .filter(donation -> inMonth(donation.getCreatedAt(), bucket))
                    .count();

            BigDecimal monthAmount = moneyDonations.stream()
                    .filter(donation -> inMonth(donation.getCreatedAt(), bucket))
                    .filter(donation ->
                            donation.getStatus() != DonorDonationStatus.CANCELLED)
                    .map(DonorMoneyDonation::getAmount)
                    .filter(java.util.Objects::nonNull)
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
                    .setScale(2, RoundingMode.HALF_UP);

            String label = bucket.getMonth()
                    .getDisplayName(TextStyle.SHORT, Locale.ENGLISH)
                    + " " + bucket.getYear();

            chart.add(DonorMonthlyDonationResponse.builder()
                    .year(bucket.getYear())
                    .month(bucket.getMonthValue())
                    .label(label)
                    .foodCount(foodCount)
                    .moneyCount(moneyCount)
                    .clothCount(clothCount)
                    .totalCount(foodCount + moneyCount + clothCount)
                    .totalAmount(monthAmount)
                    .build());
        }

        return chart;
    }

    private boolean inMonth(LocalDateTime createdAt, YearMonth bucket) {

        return createdAt != null && YearMonth.from(createdAt).equals(bucket);
    }
}
