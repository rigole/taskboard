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
import TaskDrawer from "./TaskDrawer";
import { useState } from "react";

export const TaskCard = ({ task }: TaskCardProps) => {
  const [open, setOpen] = useState(false);
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
                      onClick={() => setOpen(true)}
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
      <TaskDrawer open={open} onClose={() => setOpen(false)}>
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
            <span>📋 Tasks</span>
            <span className="text-gray-300 dark:text-gray-700">/</span>
            <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs text-orange-600 dark:text-orange-400">
              TASK-{task.id?.slice(0, 4).toUpperCase()}
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-200 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 flex flex-col space-y-8 min-h-[calc(100vh-160px)]">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                {task.title}
              </h1>
            </div>

            <div className="flex-1 flex flex-col space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Description
              </label>
              <div className="flex-1 min-h-[200px] p-4 bg-gray-50/50 dark:bg-gray-800/40 rounded-2xl border border-gray-200/60 dark:border-gray-800/80 text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap shadow-inner">
                {task.description || "No description provided for this task."}
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800/80 pt-6 space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Activity & Comments
              </label>

              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  ME
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full text-sm px-4 py-2 bg-transparent border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                  />
                  <span className="text-[11px] text-gray-400 mt-1 block">
                    Pro-tip: press M to comment instantly
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:sticky md:top-4">
            <div className="bg-gray-50/50 dark:bg-gray-800/20 rounded-2xl p-5 border border-gray-200/50 dark:border-gray-800/40 space-y-5">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100 dark:border-gray-800/60">
                Attributes
              </h3>

              <div className="grid grid-cols-3 items-center gap-2">
                <label className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                  Assignee
                </label>
                <div className="col-span-3 flex items-center gap-2.5 bg-white dark:bg-gray-800/60 p-1.5 pr-4 rounded-xl border border-gray-100 dark:border-gray-800/80 w-fit shadow-sm">
                  <img
                    src={imgProfile || profileImg}
                    alt="assignee"
                    className="w-5 h-5 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                  />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {task.assignee}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 col-span-1">
                  Priority
                </label>
                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center px-4 py-1 rounded-lg text-xs font-bold capitalize tracking-wide
              ${task.priority?.toLowerCase() === "high" ? "text-red-700  dark:text-red-400" : ""}
              ${task.priority?.toLowerCase() === "medium" ? "text-orange-700 dark:bg-orange-950/40 dark:text-orange-400" : ""}
              ${task.priority?.toLowerCase() === "low" ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400" : ""}
            `}
                  >
                    {task.priority || "High"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 items-center gap-2">
                <label className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                  Due Date
                </label>
                <div className="col-span-2 text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                  <CalendarIcon className="w-5 h-5" />{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "No due date"}
                </div>
              </div>
            </div>

            <div className="p-4 bg-transparent border border-gray-200/40 dark:border-gray-800/50 rounded-2xl text-[11px] text-gray-400 dark:text-gray-500 space-y-2 font-medium">
              <div className="flex justify-between">
                <span>Created</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Updated</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {task.updatedAt
                    ? new Date(task.updatedAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "6/13/2026, 9:37 AM"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </TaskDrawer>
    </div>
  );
};
