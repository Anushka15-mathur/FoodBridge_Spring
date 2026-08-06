package com.foodbridge.ngo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignVolunteerRequest {

    @NotNull
    private Long requestId;

    @NotNull
    private Long volunteerId;
}