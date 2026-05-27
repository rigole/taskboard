package com.taskboardbackend.taskboardbackend.dto.request;

import com.taskboardbackend.taskboardbackend.model.User;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class TaskRequest {

    @NotNull(message = "Title is required")
    private String title;

    private String description;

    private String priority;

    private String assignee;

    private String createdBy;

    private LocalDateTime dueDate;

    private Integer position;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String column;
}
