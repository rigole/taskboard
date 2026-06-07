import { useEffect } from "react";
import { useBoardState } from "../store/boardStore";
import { Header } from "../components/Header";
import { TrashIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

export const BoardPage = () => {
  const boardsUser = useBoardState((state) => state.getUserBoards);
  const boards = useBoardState((state) => state.boards);
  const isLoading = useBoardState((state) => state.loading);
  const boardError = useBoardState((state) => state.error);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBoards = async () => {
      try {
        await boardsUser();
      } catch (error) {
        console.error("Failed to load boards:", error);
      }
    };

    loadBoards();
  }, [boardsUser]);

  const openBoardDetail = (boardId: string) => {
    navigate(`/boards/${boardId}`);
  }

  const userName = localStorage.getItem("username");
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header userName={userName ?? ""} />;
      <div className="bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Boards
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage all your project boards in one place.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {boards.map((board) => (
            <div
              onClick={() => openBoardDetail(board.id)}
              key={board.id}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer border border-transparent dark:border-gray-800"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {board.name}
                </h2>
                <TrashIcon className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
              </div>

              <p className="mt-3 text-gray-500 dark:text-gray-400 line-clamp-3">
                {board.description}
              </p>

              <div className="mt-6 flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  {board.updatedAt
                    ? `Last updated: ${new Date(board.updatedAt).toLocaleDateString()}`
                    : "No updates yet"}
                </span>
                <Link to={`/boards/${board.id}`}>
                  <button  className="text-orange-500 font-medium hover:text-orange-600 cursor-point">
                    Open{" "}
                    <ArrowLongRightIcon className="w-4 h-4 inline-block ml-1" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
