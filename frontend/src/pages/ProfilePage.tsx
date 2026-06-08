import {
  RectangleGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Header } from "../components/Header.tsx";
import { useBoardState } from "../store/boardStore.ts";
import { useEffect, useState } from "react";
import type { BoardResponse } from "../types/board.ts";
import BoardModal from "../components/BoardModal.tsx";
import { Link, useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const boardsUser = useBoardState((state) => state.getUserBoards);
  const boards = useBoardState((state) => state.boards);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBoards = async () => {
      try {
        await boardsUser();
      } catch (error) {
        navigate("/login");
      }
    };

    loadBoards();
  }, [boardsUser, navigate]);

  const userName = localStorage.getItem("username");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<BoardResponse | null>(
    null,
  );
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      <Header userName={userName ?? ""} />
      <main className="p-8">
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm dark:border dark:border-gray-800">
            <RectangleGroupIcon className="w-10 h-10 text-indigo-600" />

            <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
              8
            </h3>

            <p className="text-gray-500 dark:text-gray-400">Active Boards</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm dark:border dark:border-gray-800">
            <ClockIcon className="w-10 h-10 text-orange-500" />

            <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
              14
            </h3>

            <p className="text-gray-500 dark:text-gray-400">
              Tasks In Progress
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm dark:border dark:border-gray-800">
            <CheckCircleIcon className="w-10 h-10 text-green-500" />

            <h3 className="mt-4 text-2xl font-bold ext-gray-900 dark:text-white">
              42
            </h3>

            <p className="text-gray-500 dark:text-gray-400">Tasks Completed</p>
          </div>
        </div>

        <section>
          <div className="flex justify-between items-center mb-6 text-gray-900 dark:text-white">
            <h2 className="text-2xl font-bold">My Boards</h2>

            <button className="text-indigo-600 font-medium cursor-pointer">
              <Link to="/boards">View All</Link>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {boards.slice(0, 3).map((board) => (
              <div
                key={board.id}
                onClick={() => {
                  setSelectedBoard(board);
                  setIsModalOpen(true);
                }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer dark:border dark:border-gray-800"
              >
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {board.name}
                </h3>

                <p className="text-gray-500 dark:text-gray-400">
                  {board.description}
                </p>

                <p className="text-sm text-orange-500 pt-2 dark:text-gray-400">
                  {board.updatedAt
                    ? `Last updated: ${new Date(board.updatedAt).toLocaleDateString()}`
                    : "No updates yet"}
                </p>
              </div>
            ))}

            <div
              onClick={() => {
                setSelectedBoard(null);
                setIsModalOpen(true);
              }}
              className="border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center min-h-[140px] cursor-pointer hover:border-indigo-500 transition"
            >
              <div className="text-center">
                <PlusIcon className="w-8 h-8 mx-auto text-gray-500 dark:text-gray-400" />

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Create Board
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-6 mt-10">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer dark:border dark:border-gray-800">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Recent Tasks
            </h2>

            <div className="space-y-4 text-gray-900 dark:text-white">
              <div className="flex justify-between">
                <span>Implement JWT Auth</span>
                <span className="text-orange-500">In Progress</span>
              </div>

              <div className="flex justify-between">
                <span>Create Login Page</span>
                <span className="text-green-500">Done</span>
              </div>

              <div className="flex justify-between">
                <span>Design Dashboard</span>
                <span className="text-blue-500">Review</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer dark:border dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Upcoming Deadlines
            </h2>

            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Finish React Frontend
                </p>

                <p className="text-sm text-red-500">Due Tomorrow</p>
              </div>

              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Deploy Backend
                </p>

                <p className="text-sm text-orange-500">Due in 3 days</p>
              </div>

              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Write Documentation
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Due next week
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BoardModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        board={selectedBoard}
      />
    </div>
  );
};
