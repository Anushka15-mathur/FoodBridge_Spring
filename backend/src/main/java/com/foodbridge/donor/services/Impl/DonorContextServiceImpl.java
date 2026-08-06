package com.foodbridge.donor.services.Impl;

import com.foodbridge.donor.entity.Donor;
import com.foodbridge.donor.repository.DonorRepository;
import com.foodbridge.donor.services.DonorContextService;
import com.foodbridge.exception.ResourceNotFoundException;
import com.foodbridge.exception.UnauthorizedException;
import com.foodbridge.security.CustomUserDetails;
import com.foodbridge.security.SecurityUtils;
import com.foodbridge.user.entity.User;
import com.foodbridge.user.enums.Role;
import com.foodbridge.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DonorContextServiceImpl implements DonorContextService {

    private final UserRepository userRepository;
    private final DonorRepository donorRepository;

    @Override
    public Donor getCurrentDonor() {

        CustomUserDetails userDetails = SecurityUtils.getCurrentUser();

        if (userDetails == null || userDetails.getUser() == null) {
            throw new UnauthorizedException("Authenticated donor not found.");
        }

        User user = userRepository
                .findById(userDetails.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found."));

        if (user.getRole() != Role.DONOR) {
            throw new UnauthorizedException(
                    "This resource is available only to donor accounts.");
        }

        Donor donor = donorRepository
                .findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Donor profile not found for the current user."));

        if (Boolean.TRUE.equals(donor.getIsDeleted())) {
            throw new ResourceNotFoundException(
                    "Donor profile not found for the current user.");
        }

        return donor;
    }
}
