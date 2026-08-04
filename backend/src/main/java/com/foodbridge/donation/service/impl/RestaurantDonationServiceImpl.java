package com.foodbridge.donation.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodbridge.auth.service.AuthService;
import com.foodbridge.donation.dto.CreateDonationDto;
import com.foodbridge.donation.dto.UpdateDonationDto;
import com.foodbridge.donation.dto.DonationResponseDto;
import com.foodbridge.donation.entity.DonationImage;
import com.foodbridge.donation.entity.FoodDonation;
import com.foodbridge.donation.repository.DonationImageRepository;
import com.foodbridge.donation.repository.FoodDonationRepository;
import com.foodbridge.donation.service.RestaurantDonationService;
import com.foodbridge.exception.ResourceNotFoundException;
import com.foodbridge.restaurant.entity.Restaurant;
import com.foodbridge.restaurant.repository.RestaurantRepository;
import com.foodbridge.user.dto.response.UserResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RestaurantDonationServiceImpl implements RestaurantDonationService {

    private final AuthService authService;

        private final RestaurantRepository restaurantRepository;

        private final com.foodbridge.user.repository.UserRepository userRepository;

    private final FoodDonationRepository foodDonationRepository;

    private final DonationImageRepository donationImageRepository;

    @Override
    public DonationResponseDto createDonation(CreateDonationDto request) {

        com.foodbridge.user.dto.response.UserResponse current = authService.getCurrentUser();

        com.foodbridge.user.entity.User user = userRepository.findById(current.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        Restaurant restaurant = restaurantRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant profile not found."));

        FoodDonation donation = FoodDonation.builder()
                .restaurant(restaurant)
                .title(request.getTitle())
                .description(request.getDescription())
                .foodType(request.getFoodType())
                .quantity(request.getQuantity())
                .remainingQuantity(request.getQuantity())
                .quantityUnit(request.getQuantityUnit())
                .estimatedMeals(request.getEstimatedMeals())
                .preparedAt(request.getPreparedAt())
                .expiryTime(request.getExpiryTime())
                .pickupAddress(request.getPickupAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .specialInstructions(request.getSpecialInstructions())
                .foodCondition(request.getFoodCondition())
                .build();

        FoodDonation saved = foodDonationRepository.save(donation);

        return toDto(saved);
    }

    @Override
    public DonationResponseDto updateDonation(Long donationId, UpdateDonationDto request) {

        FoodDonation donation = foodDonationRepository.findById(donationId)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found."));

        donation.setTitle(request.getTitle());
        donation.setDescription(request.getDescription());
        donation.setFoodType(request.getFoodType());
        donation.setQuantity(request.getQuantity());
        donation.setRemainingQuantity(request.getQuantity());
        donation.setQuantityUnit(request.getQuantityUnit());
        donation.setEstimatedMeals(request.getEstimatedMeals());
        donation.setPreparedAt(request.getPreparedAt());
        donation.setExpiryTime(request.getExpiryTime());
        donation.setPickupAddress(request.getPickupAddress());
        donation.setLatitude(request.getLatitude());
        donation.setLongitude(request.getLongitude());
        donation.setSpecialInstructions(request.getSpecialInstructions());
        donation.setFoodCondition(request.getFoodCondition());

        FoodDonation saved = foodDonationRepository.save(donation);

        return toDto(saved);
    }

    @Override
    public String deleteDonation(Long donationId) {

        FoodDonation donation = foodDonationRepository.findById(donationId)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found."));

        donation.setIsDeleted(true);
        foodDonationRepository.save(donation);

        return "Donation deleted successfully.";
    }

    @Override
    public DonationResponseDto addImage(Long donationId, String imageUrl) {

        FoodDonation donation = foodDonationRepository.findById(donationId)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found."));

        DonationImage img = DonationImage.builder()
                .donation(donation)
                .imageUrl(imageUrl)
                .primaryImage(false)
                .build();

        donation.getImages().add(img);

        donationImageRepository.save(img);

        return toDto(donation);
    }

    @Override
    public String removeImage(Long imageId) {

        DonationImage img = donationImageRepository.findById(imageId)
                .orElseThrow(() -> new ResourceNotFoundException("Image not found."));

        donationImageRepository.delete(img);

        return "Image removed.";
    }

    @Override
    public List<DonationResponseDto> getDonationHistoryForRestaurant() {

        com.foodbridge.user.dto.response.UserResponse current = authService.getCurrentUser();

        com.foodbridge.user.entity.User user = userRepository.findById(current.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        Restaurant restaurant = restaurantRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant profile not found."));

        return foodDonationRepository.findByRestaurant(restaurant).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private DonationResponseDto toDto(FoodDonation donation) {
        return DonationResponseDto.builder()
                .id(donation.getId())
                .title(donation.getTitle())
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
                .specialInstructions(donation.getSpecialInstructions())
                .foodCondition(donation.getFoodCondition())
                .imageUrls(donation.getImages().stream().map(i -> i.getImageUrl()).collect(Collectors.toList()))
                .build();
    }
}
