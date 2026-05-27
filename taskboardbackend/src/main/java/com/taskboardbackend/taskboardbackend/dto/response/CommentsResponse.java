package com.taskboardbackend.taskboardbackend.dto.response;

import com.taskboardbackend.taskboardbackend.model.Task;
import com.taskboardbackend.taskboardbackend.model.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;


@Data
@Builder
public class CommentsResponse {
    private UUID id;
    private String content;
    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;
    private UUID taskId;
    private UUID userId;
}
