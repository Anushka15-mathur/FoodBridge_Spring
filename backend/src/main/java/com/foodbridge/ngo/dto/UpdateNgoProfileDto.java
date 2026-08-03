package com.foodbridge.ngo.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateNgoProfileDto {

    @NotBlank(message = "NGO name is required")
    @Size(max = 255)
    private String ngoName;

    @NotBlank(message = "Address is required")
    @Size(max = 500)
    private String address;

    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0")
    @DecimalMax(value = "90.0")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0")
    @DecimalMax(value = "180.0")
    private Double longitude;

    @NotNull(message = "Operating radius is required")
    @Min(1)
    private Integer operatingRadius;

    private String placeId;

    @NotBlank(message = "Phone number is required")
    @Size(max = 20)
    private String phone;
}