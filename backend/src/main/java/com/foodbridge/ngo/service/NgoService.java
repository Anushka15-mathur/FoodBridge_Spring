package com.foodbridge.ngo.service;

import java.util.List;

import com.foodbridge.ngo.dto.DonationCardResponse;
import com.foodbridge.ngo.dto.NgoDashboardResponse;

public interface NgoService {

    NgoDashboardResponse getDashboard();

    List<DonationCardResponse> getAvailableDonations();

}