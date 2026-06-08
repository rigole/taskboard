import { useState } from "react";
import { useThemeStore } from "../store/themeStore";
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import BoardModal from "./BoardModal";
import type { BoardResponse } from "../types/board";
interface HeaderProps {
  userName: string | null;
}

export const Header = ({ userName }: HeaderProps) => {
  const { darkMode, toggleTheme } = useThemeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<BoardResponse | null>(
    null,
  );
  return (
    <div className="w-full">
      <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-6 py-4 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl text-white">
            T
          </div>
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
              Welcome {userName}!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Here's an overview of your workspace.
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-500" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
          <button
            onClick={() => {
              setSelectedBoard(null);
              setIsModalOpen(true);
            }}
            className="bg-indigo-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-indigo-500 transition shadow-sm font-medium"
          >
            Create Board
          </button>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-900 dark:text-white"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="w-7 h-7" />
          ) : (
            <Bars3Icon className="w-7 h-7" />
          )}
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-6 pt-4 flex flex-col gap-4 bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <p className="text-gray-900 dark:text-white font-semibold">
            Welcome {userName}!
          </p>
          <button
            className="bg-indigo-600 hover:bg-indigo-500 text-center px-5 py-3 rounded-lg text-white"
            onClick={() => {
              setSelectedBoard(null);
              setIsModalOpen(true);
            }}
          >
            Add Board
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-indigo-500 dark:bg-gray-800 text-white"
          >
            {darkMode ? (
              <>
                <SunIcon className="w-5 h-5 text-yellow-500" />
                Light Mode
              </>
            ) : (
              <>
                <MoonIcon className="w-5 h-5" />
                Dark Mode
              </>
            )}
          </button>
        </div>
      )}
      <BoardModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        board={selectedBoard}
      />
    </div>
  );
};
