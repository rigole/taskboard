package com.taskboardbackend.taskboardbackend.repository;

import com.taskboardbackend.taskboardbackend.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface BoardRepository extends JpaRepository<Board, UUID> {
    List<Board> findByUserId(UUID id);

    List<Board> findAllByUserIdOrderByCreatedAtDesc(UUID id);

    List<Board> findAllByNameOrderByCreatedAtDesc(String name);
}
