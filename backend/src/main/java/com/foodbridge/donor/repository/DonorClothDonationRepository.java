package com.foodbridge.donor.repository;

import com.foodbridge.donor.entity.Donor;
import com.foodbridge.donor.entity.DonorClothDonation;
import com.foodbridge.donor.enums.DonorDonationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DonorClothDonationRepository extends JpaRepository<DonorClothDonation,Long> {

    List<DonorClothDonation> findByDonorAndIsDeletedFalseOrderByCreatedAtDesc(
            Donor donor);

    List<DonorClothDonation> findByDonorAndStatusAndIsDeletedFalseOrderByCreatedAtDesc(
            Donor donor,
            DonorDonationStatus status);

    Optional<DonorClothDonation> findByIdAndDonorAndIsDeletedFalse(
            Long id,
            Donor donor);

    long countByDonorAndIsDeletedFalse(Donor donor);

    long countByDonorAndStatusAndIsDeletedFalse(
            Donor donor,
            DonorDonationStatus status);
}
