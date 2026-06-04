package com.taskboardbackend.taskboardbackend.controller;


import com.taskboardbackend.taskboardbackend.dto.request.TaskRequest;
import com.taskboardbackend.taskboardbackend.dto.response.TaskResponse;
import com.taskboardbackend.taskboardbackend.model.User;
import com.taskboardbackend.taskboardbackend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    private final TaskService taskService;

    @GetMapping("/{assignee}")
    public ResponseEntity<List<TaskResponse>> getTasksByAssignee(@PathVariable String assignee) {
        return ResponseEntity.ok(taskService.getTasksByAssignee(assignee));
    }

    @GetMapping("/{creator}")
    public ResponseEntity<List<TaskResponse>> getTasksByCreator(@PathVariable String creator) {
        return ResponseEntity.ok(taskService.getTasksByCreator(creator));
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskRequest taskRequest) {
        return ResponseEntity.ok(taskService.createTask(taskRequest));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @Valid @PathVariable UUID id,
            @RequestBody TaskRequest taskRequest,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(taskService.updateTask(id, taskRequest, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable UUID id, @AuthenticationPrincipal User user) {
        taskService.deleteTask(id, user);
        return ResponseEntity.ok().build();
    }


}
