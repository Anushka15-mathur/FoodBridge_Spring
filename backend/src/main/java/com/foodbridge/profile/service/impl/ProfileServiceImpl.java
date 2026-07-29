package com.foodbridge.profile.service.impl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartFile;

import com.foodbridge.security.CustomUserDetails;
import com.foodbridge.exception.ResourceNotFoundException;
import com.foodbridge.donor.entity.Donor;
import com.foodbridge.donor.repository.DonorRepository;
import com.foodbridge.storage.FileStorageService;
import com.foodbridge.ngo.entity.Ngo;
import com.foodbridge.ngo.repository.NgoRepository;
import com.foodbridge.profile.service.ProfileService;
import com.foodbridge.restaurant.entity.Restaurant;
import com.foodbridge.restaurant.repository.RestaurantRepository;
import com.foodbridge.user.entity.User;
import com.foodbridge.user.enums.Role;
import com.foodbridge.user.repository.UserRepository;
import com.foodbridge.volunteer.entity.Volunteer;
import com.foodbridge.volunteer.repository.VolunteerRepository;
import com.foodbridge.profile.dto.request.DonorProfileRequest;
import com.foodbridge.profile.dto.request.NgoProfileRequest;
import com.foodbridge.profile.dto.request.RestaurantProfileRequest;
import com.foodbridge.profile.dto.request.VolunteerProfileRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final NgoRepository ngoRepository;
    private final VolunteerRepository volunteerRepository;
    private final DonorRepository donorRepository;
    private final FileStorageService fileStorageService;

    private User getCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        return userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
    }

    @Override
    public void completeRestaurantProfile(
            RestaurantProfileRequest request,
            MultipartFile logo,
            MultipartFile certificate) {

        User user = getCurrentUser();

        String logoPath = fileStorageService.storeFile(logo, "restaurants");

        String certificatePath = fileStorageService.storeFile(certificate, "restaurants");

        if (user.getRole() != Role.RESTAURANT) {
            throw new IllegalStateException("User is not a restaurant.");
        }

        if (restaurantRepository.findByUser(user).isPresent()) {
            throw new IllegalStateException("Restaurant profile already exists.");
        }

        Restaurant restaurant = Restaurant.builder()
                .user(user)
                .restaurantName(request.getRestaurantName())
                .address(request.getAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .licenseNumber(request.getLicenseNumber())
                .placeId(request.getPlaceId())
                .logoPath(logoPath)
                .fssaiCertificatePath(certificatePath)
                .build();

        restaurantRepository.save(restaurant);

        user.setProfileCompleted(true);
        userRepository.save(user);
    }

    @Override
    public void completeNgoProfile(
            NgoProfileRequest request,
            MultipartFile logo,
            MultipartFile registrationCertificate) {

        User user = getCurrentUser();

        String logoPath = fileStorageService.storeFile(logo, "ngos");

        String registrationCertificatePath = fileStorageService.storeFile(
                registrationCertificate,
                "ngos");

        if (user.getRole() != Role.NGO) {
            throw new IllegalStateException("User is not an NGO.");
        }

        if (ngoRepository.findByUser(user).isPresent()) {
            throw new IllegalStateException("NGO profile already exists.");
        }

        Ngo ngo = Ngo.builder()
                .user(user)
                .ngoName(request.getNgoName())
                .address(request.getAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .registrationNumber(request.getRegistrationNumber())
                .placeId(request.getPlaceId())
                .operatingRadius(request.getOperatingRadius())
                .logoPath(logoPath)
                .registrationCertificatePath(registrationCertificatePath)
                .build();

        ngoRepository.save(ngo);

        user.setProfileCompleted(true);
        userRepository.save(user);
    }

    @Override
    public void completeVolunteerProfile(
            VolunteerProfileRequest request,
            MultipartFile drivingLicense,
            MultipartFile identityProof) {

        User user = getCurrentUser();

        String drivingLicensePath = fileStorageService.storeFile(
                drivingLicense,
                "volunteers");

        String identityProofPath = fileStorageService.storeFile(
                identityProof,
                "volunteers");

        if (user.getRole() != Role.VOLUNTEER) {
            throw new IllegalStateException("User is not a volunteer.");
        }

        if (volunteerRepository.findByUser(user).isPresent()) {
            throw new IllegalStateException("Volunteer profile already exists.");
        }

        Volunteer volunteer = Volunteer.builder()
        .user(user)
        .maxDeliveryDistance(request.getMaxDeliveryDistance())
        .drivingLicensePath(drivingLicensePath)
        .identityProofPath(identityProofPath)
        .build();

        volunteerRepository.save(volunteer);

        user.setProfileCompleted(true);
        userRepository.save(user);
    }

    @Override
    public void completeDonorProfile(
            DonorProfileRequest request,
            MultipartFile organizationProof) {

        User user = getCurrentUser();

        String organizationProofPath = fileStorageService.storeFile(
                organizationProof,
                "donors");

        if (user.getRole() != Role.DONOR) {
            throw new IllegalStateException("User is not a donor.");
        }

        if (donorRepository.findByUser(user).isPresent()) {
            throw new IllegalStateException("Donor profile already exists.");
        } 

        Donor donor = Donor.builder()
        .user(user)
        .organization(
                request.getOrganization() != null
                        ? request.getOrganization()
                        : false
        )
        .organizationName(request.getOrganizationName())
        .organizationProofPath(organizationProofPath)
        .build();
        donorRepository.save(donor);

        user.setProfileCompleted(true);
        userRepository.save(user);
    }
}