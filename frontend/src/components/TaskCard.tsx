import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging, 
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="border-2 border-dashed border-gray-300 dark:border-gray-700 bg-transparent rounded-xl h-[100px] opacity-40"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm cursor-grab touch-none"
    >
      <h3 className="font-medium text-gray-900 dark:text-white">
        {task.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {task.description}
      </p>
    </div>
  );
};