package com.taskboardbackend.taskboardbackend.repository;

import com.taskboardbackend.taskboardbackend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
    List<Comment> findAllByTaskIdOrderByCreatedAtDesc(UUID taskId);
    List<Comment> findAllByUserIdOrderByCreatedAtAsc(UUID userId);
}
