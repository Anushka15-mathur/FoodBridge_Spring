package com.foodbridge.donor.dto.request;

import com.foodbridge.donor.enums.ClothCategory;
import com.foodbridge.donor.enums.ClothCondition;
import com.foodbridge.donor.enums.DonorDonationStatus;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonorClothDonationRequest {

    @NotBlank(message = "Cloth type is required")
    @Size(max = 100, message = "Cloth type must not exceed 100 characters")
    private String clothType;

    @NotNull(message = "Category is required")
    private ClothCategory category;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    @Max(value = 100000, message = "Quantity must not exceed 100000")
    private Integer quantity;

    @NotNull(message = "Condition is required")
    private ClothCondition clothCondition;

    @NotBlank(message = "Pickup address is required")
    @Size(max = 255, message = "Pickup address must not exceed 255 characters")
    private String pickupAddress;

    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;

    private DonorDonationStatus status;
}
