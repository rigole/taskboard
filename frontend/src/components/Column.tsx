import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "./task/TaskCard";
import type { Columns } from "../types/column";
import { useDroppable } from "@dnd-kit/core";

export const Column = ({ column }: { column: Columns }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="w-80 bg-gray-100 dark:bg-gray-900 rounded-2xl p-4 flex-shrink-0 flex flex-col min-h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
          {column.name}
        </h2>
        <span className="text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
          {column.tasks.length}
        </span>
      </div>

      <SortableContext
        items={column.tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="space-y-3 flex-1 min-h-[200px]">
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};
