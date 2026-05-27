package com.taskboardbackend.taskboardbackend.repository;


import com.taskboardbackend.taskboardbackend.model.Columns;
import com.taskboardbackend.taskboardbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ColumnRepository extends JpaRepository<Columns, UUID> {
    List<Columns> findByBoardId(UUID boardId);

    List<Columns> findByPosition(Integer position);

    Optional<Columns> findByNameEqualsIgnoreCase(String name);
}
