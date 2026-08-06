package com.foodbridge.donor.dto.response;

import com.foodbridge.donor.enums.ClothCategory;
import com.foodbridge.donor.enums.ClothCondition;
import com.foodbridge.donor.enums.DonorDonationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonorClothDonationResponse {

    private Long id;

    private Long donorId;

    private String clothType;

    private ClothCategory category;

    private Integer quantity;

    private ClothCondition clothCondition;

    private String pickupAddress;

    private String description;

    private DonorDonationStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
