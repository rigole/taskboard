package com.taskboardbackend.taskboardbackend.repository;

import com.taskboardbackend.taskboardbackend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByAssigneeUserFullNameIgnoreCase(String assignee);

    List<Task> findByCreatedByFullNameIgnoreCase(String createdBy);

    List<Task> findByCreatedById(UUID createdById);

    @Query("""
                SELECT COALESCE(MAX(t.position), -1)
                FROM Task t
                WHERE t.column.id = :columnId
            """)
    Integer findMaxPositionByColumn(UUID columnId);
}
