import {
  RectangleGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  PlusIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useThemeStore } from "../store/themeStore.tsx";

const boards = [
  {
    id: 1,
    name: "Task Management App",
    tasks: 24,
  },
  {
    id: 2,
    name: "Portfolio Website",
    tasks: 12,
  },
  {
    id: 3,
    name: "CRM Project",
    tasks: 35,
  },
];

export const ProfilePage = () => {
  const { darkMode, toggleTheme } = useThemeStore();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 px-6 py-4 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl text-white">
            T
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
              Welcome user!
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

            <button className="text-indigo-600 font-medium">View All</button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {boards.map((board) => (
              <div
                key={board.id}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer dark:border dark:border-gray-800"
              >
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {board.name}
                </h3>

                <p className="text-gray-500 dark:text-gray-400">
                  {board.tasks} tasks
                </p>
              </div>
            ))}

            <div className="border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center min-h-[140px] cursor-pointer hover:border-indigo-500 transition">
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
    </div>
  );
};
