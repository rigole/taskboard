import { useEffect, useState } from "react";
import type { BoardModalProps } from "../types/board";
import toast from "react-hot-toast";
import { useBoardState } from "../store/boardStore.ts";
export default function BoardModal({ open, onClose, board }: BoardModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { addBoard, updateBoard, error, getUserBoards } = useBoardState();

  useEffect(() => {
    if (board) {
      setName(board.name);
      setDescription(board.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [board]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (board?.id) {
      await updateBoard(board.id, {
        name,
        description,
        updateDate: new Date(),
      });
      await getUserBoards();
      toast.success("Board updated successfully!");
    } else {
      await addBoard({ name, description });
      await getUserBoards();
      toast.success("Board created successfully!");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6">
          {board?.id ? "Edit Board" : "Create Board"}
        </h2>

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Board name"
            className="w-full p-3 rounded-lg border dark:bg-gray-800"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Board description"
            rows={4}
            className="w-full p-3 rounded-lg border dark:bg-gray-800"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            {board?.id ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
