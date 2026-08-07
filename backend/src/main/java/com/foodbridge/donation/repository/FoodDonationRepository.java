package com.foodbridge.donation.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.foodbridge.donation.entity.FoodDonation;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.restaurant.entity.Restaurant;
import com.foodbridge.donor.entity.Donor;
import com.foodbridge.donation.enums.DonationType;

public interface FoodDonationRepository extends JpaRepository<FoodDonation, Long> {

    List<FoodDonation> findByRestaurant(Restaurant restaurant);

    List<FoodDonation> findByStatus(DonationStatus status);

    List<FoodDonation> findByStatusInAndIsDeletedFalseAndRemainingQuantityGreaterThanAndExpiryTimeAfterOrderByExpiryTimeAsc(
            Collection<DonationStatus> statuses,
            BigDecimal remainingQuantity,
            LocalDateTime expiryTime);

    List<FoodDonation> findByDonationTypeAndStatusInAndIsDeletedFalseAndRemainingQuantityGreaterThanAndExpiryTimeAfterOrderByExpiryTimeAsc(
            DonationType donationType, Collection<DonationStatus> statuses, BigDecimal remainingQuantity, LocalDateTime expiryTime);

    List<FoodDonation> findByRestaurantAndStatus(Restaurant restaurant,
                                                 DonationStatus status);

    List<FoodDonation> findByRestaurantAndIsDeletedFalseOrderByCreatedAtDesc(
            Restaurant restaurant);

    Optional<FoodDonation> findByIdAndRestaurantAndIsDeletedFalse(
            Long id,
            Restaurant restaurant);

    List<FoodDonation> findByDonorAndIsDeletedFalseOrderByCreatedAtDesc(
            Donor donor);

    Optional<FoodDonation> findByIdAndDonorAndIsDeletedFalse(
            Long id,
            Donor donor);

    Optional<FoodDonation> findByIdAndIsDeletedFalse(Long id);

    long countByStatus(DonationStatus status);

    long countByStatusInAndIsDeletedFalseAndRemainingQuantityGreaterThanAndExpiryTimeAfter(
            Collection<DonationStatus> statuses,
            BigDecimal remainingQuantity,
            LocalDateTime expiryTime);

    long countByDonationTypeAndStatusInAndIsDeletedFalseAndRemainingQuantityGreaterThanAndExpiryTimeAfter(
            DonationType donationType, Collection<DonationStatus> statuses, BigDecimal remainingQuantity, LocalDateTime expiryTime);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("""
            update FoodDonation donation
            set donation.status = :expiredStatus
            where donation.isDeleted = false
              and donation.expiryTime <= :now
              and donation.donationType = :donationType
              and donation.status in :expirableStatuses
            """)
    int markExpiredDonations(
            @Param("now") LocalDateTime now,
            @Param("donationType") DonationType donationType,
            @Param("expiredStatus") DonationStatus expiredStatus,
            @Param("expirableStatuses") Collection<DonationStatus> expirableStatuses);
}
