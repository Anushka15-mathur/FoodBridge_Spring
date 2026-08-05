package com.foodbridge.delivery.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodbridge.delivery.entity.Delivery;
import com.foodbridge.delivery.enums.DeliveryStatus;
import com.foodbridge.volunteer.entity.Volunteer;
import com.foodbridge.allocation.entity.DonationAllocation;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    Optional<Delivery> findByAllocation(DonationAllocation allocation);

    List<Delivery> findByVolunteer(Volunteer volunteer);

    List<Delivery> findByStatus(DeliveryStatus status);

    List<Delivery> findByVolunteerAndStatus(Volunteer volunteer,
                                            DeliveryStatus status);

long countByVolunteerAndStatus(
        Volunteer volunteer,
        DeliveryStatus status);
}