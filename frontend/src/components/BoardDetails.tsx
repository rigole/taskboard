import { useParams } from "react-router-dom";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { Header } from "./Header";
import {
  DndContext,
  closestCorners,
  type DragEndEvent,
  DragOverlay,
  pointerWithin,
  type DragStartEvent,
} from "@dnd-kit/core";
import { Column } from "./Column";
import { useEffect, useState } from "react";
import { TaskCard } from "./task/TaskCard";
import type { Task } from "../types/task";
import { AddColumnCard } from "./AddColumnCard";
import { useColumnState } from "../store/columnStore";
import { useBoardState } from "../store/boardStore";
import ColumnModal from "./ColumnModal";


export const BoardDetails = () => {
  const { id } = useParams();
  const getBoardById = useBoardState((state) => state.getBoardById);
  const columns = useColumnState((state) => state.columns);
  
  const getBoardColumns = useColumnState((state) => state.getBoardColumns);
  const moveTask = useColumnState((state) => state.moveTask);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userName = localStorage.getItem("username");
  const currentBoard = useBoardState((state) => state.board);
  const loadColumns = async () => {
    try {
      if (id) {
        await getBoardColumns(id);
      }
    } catch (error) {
      console.error("Failed to load columns:", error);
    }
  };

  useEffect(() => {
    loadColumns();
    if (id) {
      getBoardById(id);
    }
  }, [getBoardColumns, id]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === active.id),
    );
    const overColumn = columns.find(
      (col) =>
        col.tasks.some((task) => task.id === over.id) || col.id === over.id,
    );

    if (!activeColumn || !overColumn) return;

    if (activeColumn.id !== overColumn.id) {
      const overTaskIndex = overColumn.tasks.findIndex((t) => t.id === over.id);
      const targetPosition =
        overTaskIndex !== -1 ? overTaskIndex : overColumn.tasks.length;

      try {
        await moveTask(active.id as string, {
          targetColumnId: overColumn.id as string,
          position: targetPosition,
        });
      } catch (error) {
        console.error("Failed to move task:", error);
      }
    } else {
      const oldIndex = activeColumn.tasks.findIndex((t) => t.id === active.id);
      const newIndex = activeColumn.tasks.findIndex((t) => t.id === over.id);

      if (oldIndex === newIndex) return;

      try {
        await moveTask(active.id as string, {
          targetColumnId: activeColumn.id as string,
          position: newIndex,
        });
      } catch (error) {
        console.error("Failed to reorder task:", error);
      }
    }
  };

  const handleAddColumn = () => {
    setIsModalOpen(true);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = columns
      .flatMap((column) => column.tasks)
      .find((task) => task.id === event.active.id);

    setActiveTask(task ?? null);
  };
  const customCollisionStrategy = (args: any) => {
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) return pointerCollisions;
    return closestCorners(args);
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header userName={userName ?? ""} />
      <div className="bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {currentBoard?.name}
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {currentBoard?.description}
            </p>
          </div>

          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowsUpDownIcon />
          </button>
        </div>
      </div>

      <DndContext
        onDragStart={handleDragStart}
        collisionDetection={customCollisionStrategy}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveTask(null)}
      >
        <div className="min-h-screen flex gap-6 overflow-x-auto p-4">
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
          <AddColumnCard onAddColumn={handleAddColumn} />
        </div>
      </DndContext>

      <div className="overflow-x-auto">
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </div>

      <ColumnModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
