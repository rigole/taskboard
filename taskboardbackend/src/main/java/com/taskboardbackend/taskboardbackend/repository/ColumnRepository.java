package com.taskboardbackend.taskboardbackend.repository;


import com.taskboardbackend.taskboardbackend.model.Columns;
import com.taskboardbackend.taskboardbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ColumnRepository extends JpaRepository<Columns, UUID> {
    @Query("""
                SELECT DISTINCT c
                FROM Columns c
                LEFT JOIN FETCH c.tasks t
                LEFT JOIN FETCH t.createdBy
                LEFT JOIN FETCH t.assigneeUser
                WHERE c.board.id = :boardId
            """)
    List<Columns> findByBoardId(UUID boardId);

    List<Columns> findByPosition(Integer position);

    Optional<Columns> findByNameEqualsIgnoreCase(String name);
}
