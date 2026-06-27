package com.taskboardbackend.taskboardbackend.service;


import com.taskboardbackend.taskboardbackend.dto.request.MoveTaskRequest;
import com.taskboardbackend.taskboardbackend.dto.request.TaskRequest;
import com.taskboardbackend.taskboardbackend.dto.response.TaskResponse;
import com.taskboardbackend.taskboardbackend.dto.response.UserResponse;
import com.taskboardbackend.taskboardbackend.model.Columns;
import com.taskboardbackend.taskboardbackend.model.Task;
import com.taskboardbackend.taskboardbackend.model.User;
import com.taskboardbackend.taskboardbackend.repository.ColumnRepository;
import com.taskboardbackend.taskboardbackend.repository.TaskRepository;
import com.taskboardbackend.taskboardbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ColumnRepository columnRepository;

    public List<TaskResponse> getTasksByAssignee(String assignee) {

        return taskRepository.findByAssigneeUserFullNameIgnoreCase(assignee).
                stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<TaskResponse> getTasksByCreator(String createdBy) {
        return taskRepository.findByCreatedByFullNameIgnoreCase(createdBy)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public TaskResponse createTask(TaskRequest taskRequest) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User taskCreatorEmail = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        User taskAssignee = userRepository
                .findByFullNameEqualsIgnoreCase(taskRequest.getAssignee())
                .orElseThrow(() -> new RuntimeException("Assignee not found"));
        Columns columnTask = columnRepository.findById(taskRequest.getColumn())
                .orElseThrow(() -> new RuntimeException("Column not found"));


        Integer maxPosition = taskRepository.findMaxPositionByColumn(columnTask.getId());


        Task task = Task.builder()
                .createdBy(taskCreatorEmail)
                .description(taskRequest.getDescription())
                .priority(taskRequest.getPriority())
                .title(taskRequest.getTitle())
                .assigneeUser(taskAssignee)
                .dueDate(taskRequest.getDueDate())
                .position(maxPosition + 1)
                .column(columnTask)
                .updatedAt(taskRequest.getUpdatedAt())
                .build();

        return mapToResponse(taskRepository.save(task));

    }

    @Transactional
    public TaskResponse getTaskById(UUID id, User user) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("task not found"));
        if (!task.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("User not authorized");
        }
        return mapToResponse(task);
    }

    @Transactional
    public TaskResponse updateTask(UUID taskId, TaskRequest taskRequest, User user) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));
        if (!task.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("User not authorized");
        }

        Columns columnTask = columnRepository.findById(taskRequest.getColumn())
                .orElseThrow(() -> new RuntimeException("Column not found"));
        task.setColumn(columnTask);

        if (taskRequest.getAssignee() != null) {
            User taskAssignee = userRepository
                    .findByFullNameEqualsIgnoreCase(taskRequest.getAssignee())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setAssigneeUser(taskAssignee);
        }

        Integer maxPosition = taskRepository.findMaxPositionByColumn(columnTask.getId());


        task.setDescription(taskRequest.getDescription());
        task.setTitle(taskRequest.getTitle());
        task.setPriority(taskRequest.getPriority());
        task.setTitle(taskRequest.getTitle());
        task.setUpdatedAt(taskRequest.getUpdatedAt());
        task.setPosition(maxPosition + 1);
        Task taskUpdated = taskRepository.saveAndFlush(task);
        return mapToResponse(taskUpdated);

    }

    public void deleteTask(UUID taskId, User user) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getCreatedBy().getId().equals(user.getId())) {
            throw new RuntimeException("User not authorized");
        }
        taskRepository.delete(task);
    }

    @Transactional
    public TaskResponse moveTask(UUID taskId, MoveTaskRequest moveTaskRequest, User user) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getColumn().getBoard().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("User not authorized");
        }

        Columns targetColumn = columnRepository.findById(moveTaskRequest.getTargetColumnId())
                .orElseThrow(() -> new RuntimeException("Column not found"));
        Columns sourceColumn = task.getColumn();

        boolean isSameColumn = sourceColumn.getId().equals(targetColumn.getId());

        if (isSameColumn) {
            List<Task> tasks = sourceColumn.getTasks().stream()
                    .filter(t -> !t.getId().equals(taskId))
                    .sorted(Comparator.comparingInt(Task::getPosition))
                    .collect(Collectors.toList());

            int targetPosition = moveTaskRequest.getPosition() != null
                    ? Math.min(moveTaskRequest.getPosition(), tasks.size())
                    : tasks.size();

            tasks.add(targetPosition, task);

            for (int i = 0; i < tasks.size(); i++) {
                tasks.get(i).setPosition(i);
            }
            taskRepository.saveAll(tasks);

        } else {
            List<Task> sourceTasks = sourceColumn.getTasks().stream()
                    .filter(t -> !t.getId().equals(taskId))
                    .sorted(Comparator.comparingInt(Task::getPosition))
                    .collect(Collectors.toList());

            for (int i = 0; i < sourceTasks.size(); i++) {
                sourceTasks.get(i).setPosition(i);
            }
            taskRepository.saveAll(sourceTasks);
            List<Task> targetTasks = targetColumn.getTasks().stream()
                    .sorted(Comparator.comparingInt(Task::getPosition))
                    .collect(Collectors.toList());

            int targetPosition = moveTaskRequest.getPosition() != null
                    ? Math.min(moveTaskRequest.getPosition(), targetTasks.size())
                    : targetTasks.size();

            targetTasks.add(targetPosition, task);
            task.setColumn(targetColumn);

            for (int i = 0; i < targetTasks.size(); i++) {
                targetTasks.get(i).setPosition(i);
            }
            taskRepository.saveAll(targetTasks);
        }

        return mapToResponse(taskRepository.save(task));
    }

    public List<UserResponse> getAllUsers() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User taskCreatorEmail = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userRepository.findAll().stream().map(this::mapUserToResponse).collect(Collectors.toList());
    }

    private UserResponse mapUserToResponse(User user) {

        return UserResponse.builder()
                .image(user.getImage())
                .id(user.getId())
                .fullName(user.getFullName())
                .role(user.getRole())
                .email(user.getEmail())
                .build();
    }

    private TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .description(task.getDescription())
                .createdAt(task.getCreatedAt())
                .createdBy(task.getCreatedBy().getFullName())
                .title(task.getTitle())
                .column(task.getColumn().getId())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .position(task.getPosition())
                .assignee(task.getAssigneeUser().getFullName())
                .updatedAt(task.getUpdatedAt())
                .build();


    }
}
