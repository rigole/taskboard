package com.taskboardbackend.taskboardbackend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "boards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Columns(nullable = false)
    private String name;

    @Columns(nullable = false)
    private String description;

    @Columns(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Columns(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="owner_id")
    private User user;

}
