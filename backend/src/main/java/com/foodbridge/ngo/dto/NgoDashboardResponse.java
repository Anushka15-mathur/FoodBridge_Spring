package com.foodbridge.ngo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NgoDashboardResponse {

    private String ngoName;

    private long availableDonations;

    private long pendingRequests;

    private long approvedRequests;

    private long totalRequests;

}