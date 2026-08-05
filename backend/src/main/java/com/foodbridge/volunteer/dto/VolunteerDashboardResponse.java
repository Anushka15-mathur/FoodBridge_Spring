package com.foodbridge.volunteer.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VolunteerDashboardResponse {

    private String volunteerName;

    private Boolean available;

    private long assignedDeliveries;

    private long pickedUpDeliveries;

    private long inTransitDeliveries;

    private long completedDeliveries;
}