package com.taskboardbackend.taskboardbackend.repository;

import com.taskboardbackend.taskboardbackend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
    @Query("SELECT c FROM Comment c JOIN FETCH c.user WHERE c.task.id = :taskId ORDER BY c.createdAt DESC")
    List<Comment> findAllByTaskIdOrderByCreatedAtDesc(UUID taskId);

    List<Comment> findAllByUserIdOrderByCreatedAtAsc(UUID userId);
}
