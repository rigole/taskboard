package com.taskboardbackend.taskboardbackend.controller;

import com.taskboardbackend.taskboardbackend.dto.request.ColumnRequest;
import com.taskboardbackend.taskboardbackend.dto.request.MoveTaskRequest;
import com.taskboardbackend.taskboardbackend.dto.response.ColumnResponse;
import com.taskboardbackend.taskboardbackend.dto.response.TaskResponse;
import com.taskboardbackend.taskboardbackend.model.User;
import com.taskboardbackend.taskboardbackend.service.ColumnsService;
import com.taskboardbackend.taskboardbackend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/columns")
public class ColumnController {

    private final ColumnsService columnsService;
    private final TaskService taskService;

    @GetMapping("/{boardId}")
    public ResponseEntity<List<ColumnResponse>> getAll(@PathVariable UUID boardId) {
        return ResponseEntity.ok(columnsService.getAllColumns(boardId));
    }

    @PostMapping
    public ResponseEntity<ColumnResponse> createColumn(@Valid @RequestBody ColumnRequest columnRequest) {
        return ResponseEntity.ok(columnsService.createColumn(columnRequest));
    }

    @PatchMapping("/{taskId}/move")
    public ResponseEntity<TaskResponse> moveTask(
            @PathVariable UUID taskId,
            @RequestBody MoveTaskRequest moveTaskRequest,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(taskService.moveTask(taskId, moveTaskRequest, user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ColumnResponse> updateColumn(@PathVariable UUID id, @RequestBody ColumnRequest columnRequest, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(columnsService.updateColumn(id, columnRequest, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteColumn(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        columnsService.deleteColumn(id, user);
        return ResponseEntity.ok().build();
    }


}
