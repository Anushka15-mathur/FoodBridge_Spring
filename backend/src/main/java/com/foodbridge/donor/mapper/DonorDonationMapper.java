package com.foodbridge.donor.mapper;
import java.util.List;

import com.foodbridge.donor.dto.response.DonorClothDonationResponse;
import com.foodbridge.donor.dto.response.DonorFoodDonationResponse;
import com.foodbridge.donor.dto.response.DonorMoneyDonationResponse;
import com.foodbridge.donor.entity.DonorClothDonation;
import com.foodbridge.donor.entity.DonorFoodDonation;
import com.foodbridge.donor.entity.DonorMoneyDonation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DonorDonationMapper {
    @Mapping(source = "donor.id", target = "donorId")
    DonorFoodDonationResponse toFoodResponse(DonorFoodDonation donation);

    List<DonorFoodDonationResponse> toFoodResponseList(
            List<DonorFoodDonation> donations);

    @Mapping(source = "donor.id", target = "donorId")
    DonorMoneyDonationResponse toMoneyResponse(DonorMoneyDonation donation);

    List<DonorMoneyDonationResponse> toMoneyResponseList(
            List<DonorMoneyDonation> donations);

    @Mapping(source = "donor.id", target = "donorId")
    DonorClothDonationResponse toClothResponse(DonorClothDonation donation);

    List<DonorClothDonationResponse> toClothResponseList(
            List<DonorClothDonation> donations);
}
