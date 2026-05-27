package com.taskboardbackend.taskboardbackend.repository;

import com.taskboardbackend.taskboardbackend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByAssigneeUserFullNameIgnoreCase(String assignee);

    List<Task> findByCreatedByFullNameIgnoreCase(String createdBy);

    List<Task> findByCreatedById(UUID createdById);
}
