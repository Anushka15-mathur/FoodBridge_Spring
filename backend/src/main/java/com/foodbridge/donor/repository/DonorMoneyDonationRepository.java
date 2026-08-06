package com.foodbridge.donor.repository;
import java.util.List;
import java.util.Optional;

import com.foodbridge.donor.entity.Donor;
import com.foodbridge.donor.entity.DonorMoneyDonation;
import com.foodbridge.donor.enums.DonorDonationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonorMoneyDonationRepository extends JpaRepository<DonorMoneyDonation,Long> {

    List<DonorMoneyDonation> findByDonorAndIsDeletedFalseOrderByCreatedAtDesc(
            Donor donor);

    List<DonorMoneyDonation> findByDonorAndStatusAndIsDeletedFalseOrderByCreatedAtDesc(
            Donor donor,
            DonorDonationStatus status);

    Optional<DonorMoneyDonation> findByIdAndDonorAndIsDeletedFalse(
            Long id,
            Donor donor);

    boolean existsByTransactionReferenceAndIsDeletedFalse(
            String transactionReference);

    boolean existsByTransactionReferenceAndIdNotAndIsDeletedFalse(
            String transactionReference,
            Long id);

    long countByDonorAndIsDeletedFalse(Donor donor);

    long countByDonorAndStatusAndIsDeletedFalse(
            Donor donor,
            DonorDonationStatus status);
}
