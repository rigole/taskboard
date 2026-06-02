import { Link } from "react-router-dom";
import {
  CheckCircleIcon,
  RectangleGroupIcon,
  ClockIcon,
  UserGroupIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useThemeStore } from "../store/themeStore.tsx";
export const HomePage = () => {
  const { darkMode, toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950  text-white">
      <nav className="flex items-center justify-between px-8 py-6 border-b bg-gray-100 dark:bg-gray-950  border-gray-800">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl">
            T
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            TaskFlow
          </h1>
        </div>

        <div className="flex items-center gap-4 text-gray-900 dark:text-white">
          <Link to="/login">Login</Link>

          <Link
            to="/register"
            className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-white rounded-lg transition"
          >
            Get Started
          </Link>
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
          </div>
        </div>
      </nav>

      <section className="px-8 py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="bg-indigo-600/20  text-indigo-400 px-4 py-2 rounded-full text-sm">
              Modern Project Management
            </span>

            <h1 className="text-6xl font-bold mt-8 leading-tight text-slate-900 dark:text-slate-100">
              Organize your work
              <span className="text-indigo-500"> beautifully</span>
            </h1>

            <p className="text-lg mt-8 leading-relaxed text-slate-900 dark:text-slate-100">
              Manage boards, tasks, deadlines, and team collaboration in one
              elegant platform built for productivity.
            </p>

            <div className="flex gap-4 mt-10">
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-xl font-semibold transition"
              >
                Start Free
              </Link>

              <Link
                to="/login"
                className="border text-indigo-500 border-slate-900 dark:text-slate-100 hover:border-gray-500 px-8 py-4 rounded-xl font-semibold transition"
              >
                Login
              </Link>
            </div>
            <div className="flex gap-10 mt-14">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  10K+
                </h2>

                <p className="text-slate-900 dark:text-gray-400">
                  Active Users
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  50K+
                </h2>

                <p className="text-slate-900 dark:text-gray-400">
                  Tasks Completed
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  99%
                </h2>

                <p className="text-slate-900 dark:text-gray-400">
                  Productivity Boost
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl">
              <div className="flex gap-4 overflow-x-auto">
                <div className="bg-gray-950 rounded-2xl p-4 w-72 flex-shrink-0">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold">To Do</h3>

                    <span className="text-sm text-gray-400">3</span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Design Landing Page</h4>

                        <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded">
                          High
                        </span>
                      </div>

                      <p className="text-sm text-gray-400 mt-2">
                        Create responsive UI for homepage
                      </p>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Setup Backend</h4>

                        <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded">
                          Medium
                        </span>
                      </div>

                      <p className="text-sm text-gray-400 mt-2">
                        Configure Spring Boot API
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-950 rounded-2xl p-4 w-72 flex-shrink-0">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold">In Progress</h3>

                    <span className="text-sm text-gray-400">2</span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">JWT Authentication</h4>

                        <span className="bg-indigo-500/20 text-indigo-400 text-xs px-2 py-1 rounded">
                          Active
                        </span>
                      </div>

                      <p className="text-sm text-gray-400 mt-2">
                        Implement secure login system
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-950 rounded-2xl p-4 w-72 flex-shrink-0">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold">Done</h3>

                    <span className="text-sm text-gray-400">5</span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Database Setup</h4>

                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      </div>

                      <p className="text-sm text-gray-400 mt-2">
                        PostgreSQL configured
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 top-10 right-10 w-72 h-72 bg-indigo-600 rounded-full blur-[120px] opacity-20"></div>
          </div>
        </div>
      </section>

      <section className="px-8 py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
              Everything you need to manage projects
            </h2>
            <p className="text-slate-900 mt-4  dark:text-slate-100">
              Powerful tools designed for modern teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            <div className="dark:bg-gray-900 border border-gray-800 p-8 rounded-2xl bg-indigo-600/20">
              <RectangleGroupIcon className="w-12 h-12 text-indigo-500" />

              <h3 className="text-xl font-semibold mt-6 text-slate-900 dark:text-slate-100">
                Kanban Boards
              </h3>

              <p className="mt-3 text-slate-900 dark:text-slate-100">
                Organize tasks visually with drag and drop boards.
              </p>
            </div>

            <div className="dark:bg-gray-900 border border-gray-800 p-8 rounded-2xl bg-indigo-600/20">
              <ClockIcon className="w-12 h-12 text-indigo-500" />

              <h3 className="text-xl font-semibold mt-6 text-slate-900 dark:text-slate-100">
                Deadlines
              </h3>
              <p className="mt-3 text-slate-900 dark:text-slate-100">
                Track due dates and stay productive.
              </p>
            </div>

            <div className="dark:bg-gray-900 border border-gray-800 p-8 rounded-2xl bg-indigo-600/20">
              <UserGroupIcon className="w-12 h-12 text-indigo-500" />

              <h3 className="text-xl font-semibold mt-6 text-slate-900 dark:text-slate-100">
                Team Collaboration
              </h3>

              <p className="mt-3 text-slate-900 dark:text-slate-100">
                Assign tasks and collaborate seamlessly.
              </p>
            </div>

            <div className="dark:bg-gray-900 border border-gray-800 p-8 rounded-2xl bg-indigo-600/20">
              <CheckCircleIcon className="w-12 h-12 text-indigo-500" />

              <h3 className="text-xl font-semibold mt-6 text-slate-900 dark:text-slate-100">
                Productivity
              </h3>

              <p className="mt-3 text-slate-900 dark:text-slate-100">
                Increase focus and complete projects faster.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
