package com.foodbridge.donation.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbridge.donation.dto.CreateDonationRequest;
import com.foodbridge.donation.dto.DonationResponse;
import com.foodbridge.donation.dto.UpdateDonationRequest;
import com.foodbridge.donation.dto.DonorDashboardResponse;
import com.foodbridge.donation.entity.FoodDonation;
import com.foodbridge.donation.enums.DonationType;
import com.foodbridge.donation.enums.DonationStatus;
import com.foodbridge.donation.repository.FoodDonationRepository;
import com.foodbridge.donation.service.DonationService;
import com.foodbridge.donation.service.DonationExpiryService;
import com.foodbridge.exception.BadRequestException;
import com.foodbridge.exception.ResourceNotFoundException;
import com.foodbridge.restaurant.entity.Restaurant;
import com.foodbridge.restaurant.repository.RestaurantRepository;
import com.foodbridge.donor.entity.Donor;
import com.foodbridge.donor.repository.DonorRepository;
import com.foodbridge.security.SecurityUtils;
import com.foodbridge.user.entity.User;
import com.foodbridge.user.enums.Role;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class DonationServiceImpl implements DonationService {

    private final FoodDonationRepository foodDonationRepository;
    private final RestaurantRepository restaurantRepository;
    private final DonorRepository donorRepository;
    private final DonationExpiryService donationExpiryService;

    @Override
    public DonationResponse createDonation(CreateDonationRequest request) {
        User user = SecurityUtils.getCurrentUser().getUser();
        if (user.getRole() == Role.DONOR) {
            return createDonorDonation(request, getCurrentDonor(user));
        }
        if (user.getRole() != Role.RESTAURANT) {
            throw new BadRequestException("Only restaurants and donors can create donations.");
        }
        if (request.getDonationType() != DonationType.FOOD) {
            throw new BadRequestException("Restaurants can create food donations only.");
        }
        Restaurant restaurant = getCurrentRestaurant();
        validateFoodRequest(request);

        LocalDateTime preparedAt = request.getPreparedAt() != null
                ? request.getPreparedAt()
                : LocalDateTime.now();

        validateDateRange(preparedAt, request.getExpiryTime());

        Double latitude = request.getLatitude() != null
                ? request.getLatitude()
                : restaurant.getLatitude();

        Double longitude = request.getLongitude() != null
                ? request.getLongitude()
                : restaurant.getLongitude();

        if (latitude == null || longitude == null) {
            throw new BadRequestException(
                    "Restaurant location is missing. Please complete the restaurant profile with latitude and longitude first.");
        }

        FoodDonation donation = FoodDonation.builder()
                .restaurant(restaurant)
                .donationType(DonationType.FOOD)
                .title(request.getFoodName().trim())
                .description(trimToNull(request.getDescription()))
                .foodType(request.getFoodType())
                .quantity(request.getQuantity())
                .remainingQuantity(request.getQuantity())
                .quantityUnit(request.getQuantityUnit())
                .estimatedMeals(request.getEstimatedMeals())
                .preparedAt(preparedAt)
                .expiryTime(request.getExpiryTime())
                .pickupAddress(request.getPickupAddress().trim())
                .latitude(latitude)
                .longitude(longitude)
                .placeId(trimToNull(request.getPlaceId()))
                .specialInstructions(trimToNull(request.getSpecialInstructions()))
                .foodCondition(request.getFoodCondition())
                .status(DonationStatus.AVAILABLE)
                .build();

        return toResponse(foodDonationRepository.save(donation));
    }

    @Override
    @Transactional(readOnly = true)
    public List<DonationResponse> getMyDonations() {
        donationExpiryService.expireDonations();

        User user = SecurityUtils.getCurrentUser().getUser();
        if (user.getRole() == Role.DONOR) {
            return foodDonationRepository.findByDonorAndIsDeletedFalseOrderByCreatedAtDesc(getCurrentDonor(user))
                    .stream().map(this::toResponse).toList();
        }
        Restaurant restaurant = getCurrentRestaurant();

        return foodDonationRepository
                .findByRestaurantAndIsDeletedFalseOrderByCreatedAtDesc(restaurant)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public DonationResponse getDonation(Long donationId) {
        donationExpiryService.expireDonations();

        User user = SecurityUtils.getCurrentUser().getUser();
        if (user.getRole() == Role.DONOR) {
            return toResponse(getOwnedDonation(donationId, getCurrentDonor(user)));
        }
        Restaurant restaurant = getCurrentRestaurant();
        return toResponse(getOwnedDonation(donationId, restaurant));
    }

    @Override
    public DonationResponse updateDonation(Long donationId, UpdateDonationRequest request) {
        if (SecurityUtils.getCurrentUser().getUser().getRole() == Role.DONOR) {
            throw new BadRequestException("Donor donations cannot be edited after submission.");
        }
        Restaurant restaurant = getCurrentRestaurant();
        FoodDonation donation = getOwnedDonation(donationId, restaurant);

        if (request.getFoodName() != null) {
            String foodName = request.getFoodName().trim();
            if (foodName.isEmpty()) {
                throw new BadRequestException("Food name cannot be blank.");
            }
            donation.setTitle(foodName);
        }

        if (request.getDescription() != null) {
            donation.setDescription(trimToNull(request.getDescription()));
        }

        if (request.getFoodType() != null) {
            donation.setFoodType(request.getFoodType());
        }

        if (request.getQuantity() != null) {
            BigDecimal alreadyAllocated = donation.getQuantity()
                    .subtract(donation.getRemainingQuantity());

            if (request.getQuantity().compareTo(alreadyAllocated) < 0) {
                throw new BadRequestException(
                        "Quantity cannot be less than the quantity already allocated.");
            }

            donation.setQuantity(request.getQuantity());
            donation.setRemainingQuantity(
                    request.getQuantity().subtract(alreadyAllocated));
        }

        if (request.getQuantityUnit() != null) {
            donation.setQuantityUnit(request.getQuantityUnit());
        }

        if (request.getEstimatedMeals() != null) {
            donation.setEstimatedMeals(request.getEstimatedMeals());
        }

        if (request.getPreparedAt() != null) {
            donation.setPreparedAt(request.getPreparedAt());
        }

        if (request.getExpiryTime() != null) {
            donation.setExpiryTime(request.getExpiryTime());
        }

        validateDateRange(donation.getPreparedAt(), donation.getExpiryTime());

        if (request.getPickupAddress() != null) {
            String pickupAddress = request.getPickupAddress().trim();
            if (pickupAddress.isEmpty()) {
                throw new BadRequestException("Pickup address cannot be blank.");
            }
            donation.setPickupAddress(pickupAddress);
        }

        if (request.getLatitude() != null) {
            donation.setLatitude(request.getLatitude());
        }

        if (request.getLongitude() != null) {
            donation.setLongitude(request.getLongitude());
        }

        if (request.getPlaceId() != null) {
            donation.setPlaceId(trimToNull(request.getPlaceId()));
        }

        if (request.getSpecialInstructions() != null) {
            donation.setSpecialInstructions(trimToNull(request.getSpecialInstructions()));
        }

        if (request.getFoodCondition() != null) {
            donation.setFoodCondition(request.getFoodCondition());
        }

        return toResponse(foodDonationRepository.save(donation));
    }

    @Override
    public void deleteDonation(Long donationId) {
        User user = SecurityUtils.getCurrentUser().getUser();
        FoodDonation donation = user.getRole() == Role.DONOR
                ? getOwnedDonation(donationId, getCurrentDonor(user))
                : getOwnedDonation(donationId, getCurrentRestaurant());

        donation.setIsDeleted(true);
        donation.setStatus(DonationStatus.CANCELLED);
        foodDonationRepository.save(donation);
    }

    @Override
    @Transactional(readOnly = true)
    public DonorDashboardResponse getDonorDashboard() {
        User user = SecurityUtils.getCurrentUser().getUser();
        Donor donor = getCurrentDonor(user);
        List<FoodDonation> donations = foodDonationRepository.findByDonorAndIsDeletedFalseOrderByCreatedAtDesc(donor);
        return DonorDashboardResponse.builder()
                .totalDonations(donations.size())
                .totalFoodDonations(donations.stream().filter(d -> d.getDonationType() == DonationType.FOOD).count())
                .totalMoneyDonations(donations.stream().filter(d -> d.getDonationType() == DonationType.MONEY).count())
                .totalAmountDonated(donations.stream().filter(d -> d.getDonationType() == DonationType.MONEY)
                        .map(FoodDonation::getAmount).filter(java.util.Objects::nonNull)
                        .reduce(BigDecimal.ZERO, BigDecimal::add))
                .totalMealsDonated(donations.stream().filter(d -> d.getDonationType() == DonationType.FOOD)
                        .map(FoodDonation::getEstimatedMeals).filter(java.util.Objects::nonNull).mapToLong(Integer::longValue).sum())
                .recentDonations(donations.stream().limit(5).map(this::toResponse).toList())
                .build();
    }

    private DonationResponse createDonorDonation(CreateDonationRequest request, Donor donor) {
        if (request.getDonationType() == DonationType.MONEY) {
            if (request.getAmount() == null || request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
                throw new BadRequestException("Amount must be greater than zero.");
            }
            FoodDonation donation = FoodDonation.builder().donor(donor).donationType(DonationType.MONEY)
                    .amount(request.getAmount()).currency(trimToNull(request.getCurrency()) == null ? "INR" : request.getCurrency().trim().toUpperCase())
                    .donationPurpose(trimToNull(request.getDonationPurpose())).description(trimToNull(request.getDescription()))
                    .status(DonationStatus.PENDING_REVIEW).build();
            return toResponse(foodDonationRepository.save(donation));
        }
        if (request.getDonationType() != DonationType.FOOD) {
            throw new BadRequestException("Donation type is required.");
        }
        validateFoodRequest(request);
        LocalDateTime preparedAt = request.getPreparedAt() != null ? request.getPreparedAt() : LocalDateTime.now();
        validateDateRange(preparedAt, request.getExpiryTime());
        FoodDonation donation = FoodDonation.builder().donor(donor).donationType(DonationType.FOOD)
                .title(request.getFoodName().trim()).description(trimToNull(request.getDescription())).foodType(request.getFoodType())
                .quantity(request.getQuantity()).remainingQuantity(request.getQuantity()).quantityUnit(request.getQuantityUnit())
                .estimatedMeals(request.getEstimatedMeals()).preparedAt(preparedAt).expiryTime(request.getExpiryTime())
                .pickupAddress(request.getPickupAddress().trim()).latitude(request.getLatitude()).longitude(request.getLongitude())
                .placeId(trimToNull(request.getPlaceId())).specialInstructions(trimToNull(request.getSpecialInstructions()))
                .foodCondition(request.getFoodCondition()).status(DonationStatus.AVAILABLE).build();
        return toResponse(foodDonationRepository.save(donation));
    }

    private void validateFoodRequest(CreateDonationRequest request) {
        if (request.getFoodName() == null || request.getFoodName().trim().isEmpty() || request.getFoodType() == null
                || request.getQuantity() == null || request.getQuantity().compareTo(BigDecimal.ZERO) <= 0
                || request.getQuantityUnit() == null || request.getEstimatedMeals() == null || request.getEstimatedMeals() < 1
                || request.getExpiryTime() == null || request.getPickupAddress() == null || request.getPickupAddress().trim().isEmpty()
                || request.getFoodCondition() == null) {
            throw new BadRequestException("All required food donation fields must be provided.");
        }
    }

    private Donor getCurrentDonor(User user) {
        if (user.getRole() != Role.DONOR) throw new BadRequestException("Only donors can access donor donations.");
        return donorRepository.findByUser(user).orElseThrow(() -> new ResourceNotFoundException("Donor profile not found."));
    }

    private Restaurant getCurrentRestaurant() {
        User user = SecurityUtils.getCurrentUser().getUser();

        if (user.getRole() != Role.RESTAURANT) {
            throw new BadRequestException("Only restaurant owners can manage donations.");
        }

        return restaurantRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Restaurant profile not found. Please complete your profile first."));
    }

    private FoodDonation getOwnedDonation(Long donationId, Restaurant restaurant) {
        return foodDonationRepository
                .findByIdAndRestaurantAndIsDeletedFalse(donationId, restaurant)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found."));
    }

    private FoodDonation getOwnedDonation(Long donationId, Donor donor) {
        return foodDonationRepository.findByIdAndDonorAndIsDeletedFalse(donationId, donor)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found."));
    }

    private void validateDateRange(LocalDateTime preparedAt, LocalDateTime expiryTime) {
        if (preparedAt == null || expiryTime == null) {
            throw new BadRequestException("Prepared time and expiry time are required.");
        }

        if (!expiryTime.isAfter(preparedAt)) {
            throw new BadRequestException("Expiry time must be after prepared time.");
        }
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }

        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    private DonationResponse toResponse(FoodDonation donation) {
        return DonationResponse.builder()
                .id(donation.getId())
                .donationType(donation.getDonationType())
                .ownerType(donation.getRestaurant() != null ? "RESTAURANT" : "DONOR")
                .ownerName(donation.getRestaurant() != null ? donation.getRestaurant().getRestaurantName()
                        : donation.getDonor().getUser().getFirstName() + " " + donation.getDonor().getUser().getLastName())
                .amount(donation.getAmount())
                .currency(donation.getCurrency())
                .donationPurpose(donation.getDonationPurpose())
                .foodName(donation.getTitle())
                .description(donation.getDescription())
                .foodType(donation.getFoodType())
                .quantity(donation.getQuantity())
                .remainingQuantity(donation.getRemainingQuantity())
                .quantityUnit(donation.getQuantityUnit())
                .estimatedMeals(donation.getEstimatedMeals())
                .preparedAt(donation.getPreparedAt())
                .expiryTime(donation.getExpiryTime())
                .pickupAddress(donation.getPickupAddress())
                .latitude(donation.getLatitude())
                .longitude(donation.getLongitude())
                .placeId(donation.getPlaceId())
                .specialInstructions(donation.getSpecialInstructions())
                .foodCondition(donation.getFoodCondition())
                .status(donation.getStatus())
                .createdAt(donation.getCreatedAt())
                .updatedAt(donation.getUpdatedAt())
                .build();
    }
}
