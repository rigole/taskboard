import { useThemeStore } from "../store/themeStore";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
interface HeaderProps {
  userName: string | null;
}

export const Header = ({ userName }: HeaderProps)  => {
    const { darkMode, toggleTheme } = useThemeStore();
    return (
      <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-6 py-4 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl text-white">
            T
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
              Welcome {userName}!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Here's an overview of your workspace.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
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

          <button className="bg-indigo-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-indigo-500 transition shadow-sm font-medium">
            Create Board
          </button>
        </div>
      </header>

    )
}