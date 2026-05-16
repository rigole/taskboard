package com.taskboardbackend.taskboardbackend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class TaskRequest {
    @NotNull(message = "Id is required")
    private UUID id;
}
