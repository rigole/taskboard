package com.taskboardbackend.taskboardbackend.controller;

import com.taskboardbackend.taskboardbackend.dto.response.ColumnResponse;
import com.taskboardbackend.taskboardbackend.service.ColumnsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/columns")
public class ColumnController {

    private final ColumnsService columnsService;

    @GetMapping
    public ResponseEntity<List<ColumnResponse>> getAll(UUID bordId) {
        return ResponseEntity.ok(columnsService.getAllColumns(bordId));
    }
}
