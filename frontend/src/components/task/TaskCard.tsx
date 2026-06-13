import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../../types/task";
interface TaskCardProps {
  task: Task;
}

import profileImg from "../../assets/profile.png";

const storedImage = localStorage.getItem("image");
const imgProfile =
  storedImage && storedImage !== "null" && storedImage !== "undefined"
    ? storedImage
    : null;

import {
  EllipsisVerticalIcon,
  Bars3Icon,
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

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
        className="h-28 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 opacity-40"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-indigo-500"
          >
            <Bars3Icon className="w-5 h-5" />
          </button>

          <h3 className="font-semibold text-gray-900 dark:text-white">
            {task.title}
          </h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu as="div" className="relative">
            <MenuButton
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <EllipsisVerticalIcon className="w-5 h-5 text-gray-500" />
            </MenuButton>

            <MenuItems
              anchor="bottom end"
              className="z-50 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none"
            >
              <div className="p-1">
                <MenuItem>
                  {({ focus }) => (
                    <button
                      onClick={() => console.log("View", task.id)}
                      className={`${
                        focus ? "bg-gray-100 dark:bg-gray-700" : ""
                      } flex w-full text-gray-900 dark:text-white items-center gap-3 rounded-lg px-3 py-2 text-sm`}
                    >
                      <EyeIcon className="w-5 h-5" />
                      View Details
                    </button>
                  )}
                </MenuItem>

                <MenuItem>
                  {({ focus }) => (
                    <button
                      onClick={() => console.log("Edit", task.id)}
                      className={`${
                        focus ? "bg-gray-100 dark:bg-gray-700" : ""
                      } flex w-full text-gray-900 dark:text-white items-center gap-3 rounded-lg px-3 py-2 text-sm`}
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                      Edit Task
                    </button>
                  )}
                </MenuItem>

                <MenuItem>
                  {({ focus }) => (
                    <button
                      onClick={() => console.log("Delete", task.id)}
                      className={`${
                        focus ? "bg-red-100 dark:bg-red-900/30" : ""
                      } flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 dark:text-red-400`}
                    >
                      <TrashIcon className="w-5 h-5" />
                      Delete Task
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </button>
      </div>
      <div
        onClick={() => {
          console.log("Open task drawer");
        }}
        className="cursor-pointer px-4 pb-4"
      >
        <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {task.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <img
              src={imgProfile || profileImg}
              alt="user"
              className="w-6 h-6 rounded-full"
            />
            {task.assignee}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <CalendarIcon className="w-5 h-5" />{" "}
            {task.createdAt
              ? new Date(task.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
};
