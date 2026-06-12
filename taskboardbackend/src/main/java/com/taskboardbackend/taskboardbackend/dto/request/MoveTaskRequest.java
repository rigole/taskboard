package com.taskboardbackend.taskboardbackend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MoveTaskRequest {
    private UUID targetColumnId;
    private Integer position;
}
