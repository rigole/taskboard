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
public class CommentsRequest {

    @NotNull(message = "Content is required")
    private String content;

    private LocalDateTime updatedAt;
    private UUID taskId;

}
