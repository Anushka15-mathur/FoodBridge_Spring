package com.foodbridge.profile.service;

import org.springframework.web.multipart.MultipartFile;

import com.foodbridge.profile.dto.request.DonorProfileRequest;
import com.foodbridge.profile.dto.request.NgoProfileRequest;
import com.foodbridge.profile.dto.request.RestaurantProfileRequest;
import com.foodbridge.profile.dto.request.VolunteerProfileRequest;

public interface ProfileService {

    void completeRestaurantProfile(
            RestaurantProfileRequest request,
            MultipartFile logo,
            MultipartFile certificate
    );

    void completeNgoProfile(
            NgoProfileRequest request,
            MultipartFile logo,
            MultipartFile registrationCertificate
    );

    void completeVolunteerProfile(
            VolunteerProfileRequest request,
            MultipartFile drivingLicense,
            MultipartFile identityProof
    );

    void completeDonorProfile(
            DonorProfileRequest request,
            MultipartFile organizationProof
    );

}