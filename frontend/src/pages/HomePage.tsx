import { Link } from "react-router-dom";
import {
  CheckCircleIcon,
  RectangleGroupIcon,
  ClockIcon,
  UserGroupIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useThemeStore } from "../store/themeStore.tsx";
import { useState } from "react";
export const HomePage = () => {
  const { darkMode, toggleTheme } = useThemeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950  text-white">
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950">
        <div className="flex items-center justify-between px-6 md:px-8 py-6">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl text-white">
              T
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              TaskFlow
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-4 text-gray-900 dark:text-white">
            <Link to="/login">Login</Link>

            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-white rounded-lg transition"
            >
              Get Started
            </Link>

            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-indigo-500 transition"
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5  text-white" />
              ) : (
                <MoonIcon className="w-5 h-5 dark:bg-indigo-600 text-gray-900" />
              )}
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
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
            <Link
              to="/login"
              className="text-gray-900 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-500 text-center px-5 py-3 rounded-lg text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>

            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 p-3 rounded-lg bg-indigo-500 dark:bg-gray-800"
            >
              {darkMode ? (
                <>
                  <SunIcon className="w-5 h-5 text-yellow-500" />
                  Light Mode
                </>
              ) : (
                <>
                  <MoonIcon className="w-5 h-5 dark:bg-indigo-600 text-gray-900" />
                  Dark Mode
                </>
              )}
            </button>
          </div>
        )}
      </nav>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block bg-indigo-600/20 text-indigo-400 px-4 py-2 rounded-full text-sm">
              Modern Project Management
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-slate-100">
              Organize your work
              <span className="text-indigo-500"> beautifully</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              Manage boards, tasks, deadlines, and team collaboration in one
              elegant platform built for productivity.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-center px-8 py-4 rounded-xl font-semibold transition"
              >
                Start Free
              </Link>

              <Link
                to="/login"
                className="border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-center px-8 py-4 rounded-xl font-semibold transition"
              >
                Login
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                  10K+
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400">
                  Active Users
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                  50K+
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400">
                  Tasks Completed
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                  99%
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400">
                  Productivity Boost
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Board Preview */}
          <div className="relative">
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden">
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                {/* TODO */}
                <div className="bg-gray-950 rounded-2xl p-4 min-w-[260px] sm:min-w-[300px]">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-white">To Do</h3>
                    <span className="text-sm text-gray-400">3</span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-white">
                          Design Landing Page
                        </h4>

                        <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded">
                          High
                        </span>
                      </div>

                      <p className="text-sm text-gray-400 mt-2">
                        Create responsive UI for homepage
                      </p>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-white">
                          Setup Backend
                        </h4>

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

                {/* IN PROGRESS */}
                <div className="bg-gray-950 rounded-2xl p-4 min-w-[260px] sm:min-w-[300px]">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-white">In Progress</h3>
                    <span className="text-sm text-gray-400">2</span>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-white">
                        JWT Authentication
                      </h4>

                      <span className="bg-indigo-500/20 text-indigo-400 text-xs px-2 py-1 rounded">
                        Active
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 mt-2">
                      Implement secure login system
                    </p>
                  </div>
                </div>

                {/* DONE */}
                <div className="bg-gray-950 rounded-2xl p-4 min-w-[260px] sm:min-w-[300px]">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-semibold text-white">Done</h3>
                    <span className="text-sm text-gray-400">5</span>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-white">Database Setup</h4>

                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    </div>

                    <p className="text-sm text-gray-400 mt-2">
                      PostgreSQL configured
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block absolute -z-10 top-10 right-10 w-72 h-72 bg-indigo-600 rounded-full blur-[120px] opacity-20" />
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
