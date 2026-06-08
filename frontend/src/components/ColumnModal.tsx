import { useState } from "react";
import toast from "react-hot-toast";
import { useColumnState } from "../store/columnStore";
import type { ColumnModalProps } from "../types/column.ts";
import { useBoardState } from "../store/boardStore.ts";
export default function ColumnModal({ open, onClose }: ColumnModalProps) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState(0);
  const { createColumn } = useColumnState();
  const currentBoard = useBoardState((state) => state.board);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!currentBoard?.id) return;
    console.log("Creating column with name:", name, "position:", position, "for board ID:", currentBoard.id);
    await createColumn({ name, boardId: currentBoard?.id, position: position, tasks: [] });
    toast.success("Column created successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl dark:text-white font-semibold mb-6">
          Create Column
        </h2>

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Column name"
            className="w-full p-3 rounded-lg border dark:text-white dark:bg-gray-800"
          />

          <input
            value={position}
            onChange={(e) => setPosition(parseInt(e.target.value) || 0)}
            placeholder="Column position"
            type="number"
            className="w-full p-3 rounded-lg border dark:text-white dark:bg-gray-800"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg dark:text-white dark:border-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Create Column
          </button>
        </div>
      </div>
    </div>
  );
}
