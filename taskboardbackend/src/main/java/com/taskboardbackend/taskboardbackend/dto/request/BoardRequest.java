package com.taskboardbackend.taskboardbackend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardRequest {

    @NotNull(message = "Name is required")
    private String name;
    private String description;
    private LocalDateTime updateDate;

}
