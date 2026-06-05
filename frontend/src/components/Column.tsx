import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";
import type { Columns } from "../types/column";

export const Column = ({ column }: { column: Columns }) => {
  return (
    <div key={column.id} className="w-80 bg-gray-100 dark:bg-gray-900 rounded-2xl p-4 flex-shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg text-gray-900 dark:text-white">{column.name}</h2>
          <span className="text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
            {column.tasks.length}
          </span>
        </div>
      <SortableContext
        items={column.tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {column.tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};