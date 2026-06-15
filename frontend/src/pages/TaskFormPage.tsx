import  { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";


interface TaskFormPayload {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
  targetColumnId: string;
  assigneeId: string;
}

export const TaskFormPage = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const location = useLocation();
  const isEditMode = !!taskId;


  const [formData, setFormData] = useState<TaskFormPayload>({
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: "",
    targetColumnId: "",
    assigneeId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode) {
      const simulatedFetchedTask = {
        title: "Task 1",
        description: "this is the first task ever",
        priority: "HIGH" as const,
        dueDate: "2026-06-30T12:00",
        targetColumnId: "57f0cca5-1d5f-4036-97c1-67567e83efd8",
        assigneeId: "user-uuid-123",
      };

      setFormData(simulatedFetchedTask);
    } else {
      const queryParams = new URLSearchParams(location.search);
      const preselectedColumn = queryParams.get("columnId");
      if (preselectedColumn) {
        setFormData((prev) => ({ ...prev, targetColumnId: preselectedColumn }));
      }
    }
  }, [taskId, isEditMode, location.search]);

  const { title, description, priority, dueDate, targetColumnId, assigneeId } = formData;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !targetColumnId) {
      setError("Summary, Description, and Destination Stage are mandatory fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const formattedDueDate = dueDate ? new Date(dueDate).toISOString().slice(0, 19) : "";
      
      const finalPayload = {
        ...formData,
        dueDate: formattedDueDate,
      };

      if (isEditMode) {
        // await useBoardStore.getState().updateTask(taskId, finalPayload);
        console.log("Updating existing task via PUT/PATCH:", taskId, finalPayload);
      } else {
        // await useBoardStore.getState().createTask(finalPayload);
        console.log("Creating new task via POST:", finalPayload);
      }

      navigate("/board");
    } catch (err: any) {
      setError(err?.response?.data?.message || "An operational error occurred while saving your task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-12 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 md:p-10">
        <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-5">
          <div className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1">
            {isEditMode ? `Task Identity: TASK-${taskId?.slice(0, 4).toUpperCase()}` : "New Work Entry"}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {isEditMode ? "Edit Issue details" : "Create Issue"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-sm font-medium bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-3 rounded-xl border border-red-200 dark:border-red-900/50">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Summary <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/80 transition-all shadow-inner"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={description}
              onChange={handleInputChange}
              placeholder="Provide a structural definition or task requirements description..."
              rows={6}
              className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white text-sm leading-relaxed placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/80 transition-all resize-y shadow-inner"
              required
            />
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Status Stage <span className="text-red-500">*</span>
              </label>
              <select
                name="targetColumnId"
                value={targetColumnId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/80 transition-all"
                required
              >
                <option value="" disabled>Select processing line...</option>
                <option value="57f0cca5-1d5f-4036-97c1-67567e83efd8">TO DO</option>
                <option value="d8f20403-1991-4fa9-bf2c-192cd03078e0">In Progress</option>
                <option value="37c5d34a-736e-4b76-ab25-826b438f8165">Done</option>
              </select>
            </div>

            
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Assignee
              </label>
              <select
                name="assigneeId"
                value={assigneeId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/80 transition-all"
              >
                <option value="">Unassigned</option>
                <option value="user-uuid-123">John Doe</option>
                <option value="user-uuid-456">Jane Smith</option>
              </select>
            </div>

           
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Priority Ranking
              </label>
              <select
                name="priority"
                value={priority}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/80 transition-all"
              >
                <option value="LOW">🔵 Low</option>
                <option value="MEDIUM">🟠 Medium</option>
                <option value="HIGH">🔴 High</option>
              </select>
            </div>

            
            <div>
              <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                Due Date Selection
              </label>
              <input
                type="datetime-local"
                name="dueDate"
                value={dueDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50/50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/80 transition-all"
              />
            </div>

          </div>

          
          <div className="flex justify-end items-center gap-4 border-t border-gray-100 dark:border-gray-800 pt-6 mt-10">
            <button
              type="button"
              onClick={() => navigate("/board")}
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
              {isSubmitting ? "Saving changes..." : isEditMode ? "Update" : "Create"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};