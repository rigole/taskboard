import { useParams } from "react-router-dom";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { Header } from "./Header";
import {
  DndContext,
  closestCorners,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core";
import { Column } from "./Column";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";
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
  const updateColumn = useColumnState((state) => state.updateColumn);
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

    if (!over || active.id === over.id) {
      return;
    }

    const activeColumn = findColumn(active.id as string);
    const overColumn = findColumn(over.id as string);

    if (!activeColumn || !overColumn) {
      return;
    }
    const column = columns.find((column) =>
      column.tasks.some((task) => task.id === active.id),
    );

    if (!column) return;

    const oldIndex = column.tasks.findIndex((task) => task.id === active.id);
    const newIndex = column.tasks.findIndex((task) => task.id === over.id);

    const reorderedTasks = arrayMove(column.tasks, oldIndex, newIndex);

    await updateColumn(column.id, { tasks: reorderedTasks });
  };

  const handleAddColumn = () => {
    setIsModalOpen(true);
  };

  const findColumn = (taskId: string) => {
    return columns.find((column) =>
      column.tasks.some((task) => task.id === taskId),
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = columns
      .flatMap((column) => column.tasks)
      .find((task) => task.id === event.active.id);

    setActiveTask(task ?? null);
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
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
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
