package com.foodbridge.profile.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import com.foodbridge.profile.dto.request.DonorProfileRequest;
import com.foodbridge.profile.dto.request.NgoProfileRequest;
import com.foodbridge.profile.dto.request.RestaurantProfileRequest;
import com.foodbridge.profile.dto.request.VolunteerProfileRequest;
import com.foodbridge.profile.service.ProfileService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@Validated
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping(value = "/restaurant", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> completeRestaurantProfile(

            @RequestPart("data") @Valid RestaurantProfileRequest request,

            @RequestPart(value = "logo", required = false) MultipartFile logo,

            @RequestPart(value = "certificate", required = false) MultipartFile certificate) {

        profileService.completeRestaurantProfile(
                request,
                logo,
                certificate);

        return ResponseEntity.ok("Restaurant profile completed successfully.");
    }

    @PostMapping(value = "/ngo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> completeNgoProfile(

            @RequestPart("data") @Valid NgoProfileRequest request,

            @RequestPart(value = "logo", required = false) MultipartFile logo,

            @RequestPart(value = "registrationCertificate", required = false) MultipartFile registrationCertificate) {

        profileService.completeNgoProfile(
                request,
                logo,
                registrationCertificate);

        return ResponseEntity.ok("NGO profile completed successfully.");
    }

    @PostMapping(value = "/volunteer", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> completeVolunteerProfile(

            @RequestPart("data") @Valid VolunteerProfileRequest request,

            @RequestPart(value = "drivingLicense", required = false) MultipartFile drivingLicense,

            @RequestPart(value = "identityProof", required = false) MultipartFile identityProof) {

        profileService.completeVolunteerProfile(
                request,
                drivingLicense,
                identityProof);

        return ResponseEntity.ok("Volunteer profile completed successfully.");
    }

    @PostMapping(value = "/donor", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> completeDonorProfile(

            @RequestPart("data") @Valid DonorProfileRequest request,

            @RequestPart(value = "organizationProof", required = false) MultipartFile organizationProof) {

        profileService.completeDonorProfile(request, organizationProof);

        return ResponseEntity.ok("Donor profile completed successfully.");
    }
}