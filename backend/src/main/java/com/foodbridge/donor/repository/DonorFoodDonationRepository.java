package com.foodbridge.donor.repository;

import com.foodbridge.donor.entity.Donor;
import com.foodbridge.donor.entity.DonorFoodDonation;
import com.foodbridge.donor.enums.DonorDonationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DonorFoodDonationRepository extends JpaRepository<DonorFoodDonation,Long> {

    List<DonorFoodDonation> findByDonorAndIsDeletedFalseOrderByCreatedAtDesc(
            Donor donor);

    List<DonorFoodDonation> findByDonorAndStatusAndIsDeletedFalseOrderByCreatedAtDesc(
            Donor donor,
            DonorDonationStatus status);

    Optional<DonorFoodDonation> findByIdAndDonorAndIsDeletedFalse(
            Long id,
            Donor donor);

    long countByDonorAndIsDeletedFalse(Donor donor);

    long countByDonorAndStatusAndIsDeletedFalse(
            Donor donor,
            DonorDonationStatus status);
}
