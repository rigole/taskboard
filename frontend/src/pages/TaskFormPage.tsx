import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import type { TaskRequest } from "../types/task";
import { useTaskState } from "../store/taskStore";
import profileImg from "../assets/profile.png";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Header } from "../components/Header";
import { useBoardState } from "../store/boardStore";
import { useColumnState } from "../store/columnStore";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import toast from "react-hot-toast";

export const TaskFormPage = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const location = useLocation();
  const isEditMode = !!taskId;
  const userName = localStorage.getItem("username");
  const currentBoard = useBoardState((state) => state.board);
  const columns = useColumnState((state) => state.columns);
  const getBoardColumns = useColumnState((state) => state.getBoardColumns);
  const getUsersForTask = useTaskState((state) => state.getUsersForTask);
  const getTask = useTaskState((state) => state.getTask);
  const taskStateError = useTaskState((state) => state.error);
  const addTask = useTaskState((state) => state.addTask);
  const updateTask = useTaskState((state) => state.updateTask);
  const users = useTaskState((state) => state.users);
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskRequest>();

     

  const [isSubmitting, setIsSubmitting] = useState(false);
 // const [comments, setComments] = useState<CommentResponse[]>([]);
  const [newComment, setNewComment] = useState("");

  const openBoardDetail = (boardId: string) => {
    navigate(`/boards/${boardId}`);
  };

  const loadUsers = async () => {
    try {
      await getUsersForTask();
    } catch (error) {
      console.error("Failed to load boards:", error);
    }
  };

  const onSubmit = async (task: TaskRequest) => {
    setIsSubmitting(true);
    if (isEditMode) {
      try {
        if (taskId) {
          updateTask(taskId, task);
          if (!taskStateError) {
            toast.success("task Updated successfully.");
            if (currentBoard) {
              openBoardDetail(currentBoard?.id);
            }
          } else {
            toast.error(taskStateError);
          }
        }
      } catch (error) {
        toast.error(taskStateError);
        console.error("task edit failed:", error);
      }
    } else {
      try {
        const data = {
          ...task,
          dueDate: `${task.dueDate}:00`,
        };
        await addTask(data);

        if (!taskStateError) {
          toast.success("task Added successfully.");
          if (currentBoard) {
            openBoardDetail(currentBoard?.id);
          }
        } else {
          toast.error(taskStateError);
        }
      } catch (error) {
        toast.error(taskStateError);
        console.error("task creation failed:", error);
      }
    }
  };
  const loadColumns = async () => {
    try {
      if (currentBoard) {
        await getBoardColumns(currentBoard?.id);
      }
    } catch (error) {
      console.error("Failed to loads columns", error);
    }
  };
  const getTaskById = async () => {
    try {
      if (taskId) {
        const task = await getTask(taskId);
        console.log(task);
        reset({
          title: task?.title,
          description: task?.description,
          priority: task?.priority,
          dueDate: task?.dueDate,
          assignee: task?.assignee,
          column: task?.column,
        });
      }
    } catch (error) {
      console.error("Failed to loads task", error);
    }
  };
  useEffect(() => {
    loadUsers();
    loadColumns();

    if (isEditMode) {
      getTaskById();
    }
  }, [taskId, isEditMode, currentBoard, location.search]);

  const handleAddComment = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    /*
    const freshlyCreatedComment: Comment = {
      id: Math.random().toString(),
      author: "John Doe",
      content: "Awesome, let me know if you need any database script backups.",
      createdAt: new Date(),
      taskId: "remkerrmkrtb",
      updatedAt: new Date(),
    };

    setComments((prev) => [...prev, freshlyCreatedComment]);
    */
    setNewComment("");
  };

  return (
    <>
      <Header userName={userName ?? ""} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-12 flex justify-center items-start">
        <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 md:p-10">
          <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-5">
            <div className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1">
              {isEditMode
                ? `Task Identity: TASK-${taskId?.slice(0, 4).toUpperCase()}`
                : "New Work Entry"}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              {isEditMode ? "Edit Issue details" : "Create Issue"}
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Summary <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("title", {
                  required: "title is required",
                })}
                placeholder="What needs to be done?"
                className={`w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800/40 border 
                 dark:border-gray-800 rounded-xl 
                text-gray-900 dark:text-white font-medium 
                placeholder-gray-400 focus:outline-none
                 focus:ring-2 focus:ring-orange-500/80 
                 transition-all shadow-inner ${errors.title ? "border-red-500 bg-red-50" : "border-gray-200"}`}
              />
              {errors.title && (
                <span className="text-red-500 text-sm mb-4 block">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description", {
                  required: "description is required",
                })}
                placeholder="Provide a structural definition or task requirements description..."
                rows={6}
                className={`w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800/40 border dark:border-gray-800 rounded-xl text-gray-900 dark:text-white
                   text-sm leading-relaxed placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-orange-500/80 
                   transition-all resize-y shadow-inner ${errors.description ? "border-red-500 bg-red-50" : "border-gray-200"}`}
              />
              {errors.description && (
                <span className="text-red-500 text-sm mb-4 block">
                  {errors.description.message}
                </span>
              )}
            </div>

            {isEditMode && (
              <div className="border-t border-gray-200 dark:border-gray-800/80 pt-6 mt-8 space-y-4">
                <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Activity & Comments Feed
                </label>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                </div>

                <div className="flex gap-3 items-start pt-2">
                  <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm shadow-orange-500/20">
                    ME
                  </div>
                  <div className="w-full flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add an update comment to this issue..."
                      className="w-full text-xs px-4 py-2.5 bg-gray-50/50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={handleAddComment}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl transition-all"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  Column<span className="text-red-500">*</span>
                </label>
                <select
                  {...register("column", {
                    required: "column is required",
                  })}
                  className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/80 transition-all"
                >
                  {columns?.map((column) => (
                    <option key={column.id} value={column.id}>
                      {" "}
                      {column.name}
                    </option>
                  ))}
                </select>

                {errors.column && (
                  <span className="text-red-500 text-sm mb-4 block">
                    {errors.column.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  Priority Ranking <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("priority", {
                    required: "Priority Level  is required",
                  })}
                  className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/80 transition-all"
                >
                  <option value="low"> Low</option>
                  <option value="medium"> Medium</option>
                  <option value="high"> High</option>
                </select>
                {errors.priority && (
                  <span className="text-red-500 text-sm mb-4 block">
                    {errors.priority.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  Assignee <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="assignee"
                  control={control}
                  rules={{
                    required: "Assignee is required",
                  }}
                  render={({ field }) => (
                    <Listbox value={field.value} onChange={field.onChange}>
                      <div className="relative mt-2 ">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-200 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/80  py-2 pl-3 pr-10 text-left shadow-sm">
                          <div className="flex  items-center gap-2">
                            <img
                              src={profileImg}
                              className="w-8 h-8 rounded-full"
                            />

                            <span> {field.value || "Select an assignee"}</span>
                          </div>

                          <ChevronUpDownIcon className="absolute right-2 top-3 h-5 w-5 text-gray-500" />
                        </Listbox.Button>

                        <Listbox.Options className="absolute z-10  mt-1 max-h-60 w-full overflow-auto bg-gray-200 rounded-lg dark:text-white dark:bg-gray-900 shadow-lg border">
                          {users.map((user) => (
                            <Listbox.Option
                              key={user.id}
                              value={user.fullName}
                              className="cursor-pointer select-none px-3 py-2 dark:data-[focus]:bg-gray-800 data-[focus]:bg-white"
                            >
                              {({ selected }) => (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={profileImg}
                                      alt={user.fullName}
                                      className="w-8 h-8 rounded-full"
                                    />

                                    <span>{user.fullName}</span>
                                  </div>

                                  {selected && (
                                    <CheckIcon className="h-5 w-5 text-indigo-600" />
                                  )}
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  )}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                  Due Date Selection <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  {...register("dueDate", {
                    required: "Deadline is required",
                  })}
                  className={`w-full px-4 py-3 
                  bg-gray-50/50 dark:bg-gray-800/40 border
                   dark:border-gray-800
                    rounded-xl text-gray-900 
                   dark:text-white 
                   text-sm font-semibold focus:outline-none
                    focus:ring-2 
                    focus:ring-orange-500/80 transition-all  ${errors.dueDate ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                />
                {errors.dueDate && (
                  <span className="text-red-500 text-sm mb-4 block">
                    {errors.dueDate.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end items-center gap-4 border-t border-gray-100 dark:border-gray-800 pt-6 mt-10">
              <button
                type="button"
                onClick={() => navigate("/boards")}
                className="px-5 py-2.5 text-sm font-semibold text-gray-500 dark:text-gray-400 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-xl transition-all"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700 rounded-xl transition-all shadow-md shadow-orange-500/10 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Saving changes..."
                  : isEditMode
                    ? "Update"
                    : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
