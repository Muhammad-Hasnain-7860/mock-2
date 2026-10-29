// Pure UI: JSX + Tailwind only. No state, no handlers.
// Optional: add the Google font "Caveat" for the handwritten line. Falls back to cursive.

import { deleteTask } from "../../../addTaskForm/state/addTaskForm";
import useAllTask from "../../hooks/useAllTask";

const pin =
  "absolute -top-3 left-1/2 z-10 h-7 w-7 -translate-x-1/2 rounded-full";
const shell =
  "relative rounded-[2rem] bg-white p-3 shadow-[0_12px_24px_-16px_rgba(20,20,40,0.2)] ring-1 ring-black/[0.03]";

const CalendarIcon = () => (
  <svg
    className="h-4 w-4 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
  </svg>
);

export default function TodoDashboardPinned() {
  const {
    setSearch,
    search,
    showTask,
    setCategory,
    progress,
    handleToggle,
    category,
    tasks,
    navigate,
    dispatch,
    toggleUpdate,
  } = useAllTask();
  return (
    <div className="min-h-screen bg-[#F3F3F5] bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_55px,rgba(0,0,0,0.045)_55px,rgba(0,0,0,0.045)_56px)] text-[#1B1B1F] antialiased">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        {/* Header */}
        <header className="text-center">
          <p className="text-sm text-neutral-500">
            {new Date().toLocaleDateString("en-CA")}
          </p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight text-neutral-700 sm:text-5xl">
            All tasks
          </h1>
          <button
            onClick={() => navigate("/add-task-form")}
            className="cursor-pointer rounded-full bg-[#4A6CF7] px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-[#3552E0] mt-5"
          >
            + Add Task
          </button>
        </header>

        {/* Progress */}
        <section
          aria-label="Progress"
          className="mx-auto mt-10 max-w-2xl rounded-[2rem] bg-white/90 p-3 shadow-[0_12px_24px_-16px_rgba(20,20,40,0.2)] ring-1 ring-black/[0.04]"
        >
          <div className="rounded-3xl bg-gradient-to-br from-[#F6F0EC] via-[#F3F2F8] to-[#EAEEF9] p-6 sm:p-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-neutral-500">Completed</p>
                <p className="mt-1 text-5xl font-semibold tracking-tight">
                  {tasks.filter((task) => task.status === "complete").length}
                  <span className="ml-2 text-2xl font-normal text-neutral-400">
                    of {tasks.length}
                  </span>
                </p>
              </div>
              <div className="flex gap-5 text-right text-sm text-neutral-500">
                <div>
                  <p className="text-xl font-medium text-neutral-800">
                    {tasks.filter((task) => task.status === "pending").length}
                  </p>
                  <p>pending</p>
                </div>
                <div>
                  <p className="text-xl font-medium text-[#E4572E]">
                    {tasks.filter((task) => task.isDueDate === true).length}
                  </p>
                  <p>Overdue</p>
                </div>
              </div>
            </div>

            <div
              role="progressbar"
              aria-valuenow="58"
              aria-valuemin="0"
              aria-valuemax="100"
              className="mt-6 h-2.5 overflow-hidden rounded-full bg-white/80"
            >
              <div
                className={`h-full rounded-full bg-[#4A6CF7]`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-neutral-500">
              {progress}% done.{" "}
              {tasks.length -
                tasks.filter((task) => task.status === "complete").length}{" "}
              tasks left.
            </p>
          </div>
        </section>

        {/* Search + priority filters */}
        <section className="mx-auto mt-10 flex max-w-2xl flex-col gap-5">
          <label className="flex items-center gap-3 rounded-full bg-white px-5 py-3.5 ring-1 ring-black/[0.06]">
            <svg
              className="h-5 w-5 shrink-0 text-neutral-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" onClick={() => setSearch("")} />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="sr-only">Search tasks</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search tasks"
              className="min-w-0 flex-1 bg-transparent text-base leading-6 outline-none placeholder:text-neutral-400"
            />
          </label>

          <div className="flex flex-col items-center gap-3">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Filter by category
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: "All", value: null, color: null, count: tasks.length },
                {
                  label: "Hard",
                  value: "Hard",
                  color: "#FF7A45",
                  count: tasks.filter((t) => t.priority === "Hard").length,
                },
                {
                  label: "Medium",
                  value: "Medium",
                  color: "#4A6CF7",
                  count: tasks.filter((t) => t.priority === "Medium").length,
                },
                {
                  label: "Easy",
                  value: "Easy",
                  color: "#2FB67C",
                  count: tasks.filter((t) => t.priority === "Easy").length,
                },
              ].map(({ label, value, color, count }) => {
                const active = category === value;
                return (
                  <button
                    key={label}
                    onClick={() => setCategory(value)}
                    className={`flex cursor-pointer items-center rounded-full px-4 py-2 text-sm font-medium shadow-md transition active:scale-95 ${
                      active
                        ? color
                          ? "text-black"
                          : "bg-black text-white"
                        : "bg-white text-neutral-600 hover:text-neutral-900"
                    }`}
                    style={
                      active && color ? { backgroundColor: color } : undefined
                    }
                  >
                    {color && (
                      <span
                        className="mr-2 inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: active ? "#000" : color }}
                      />
                    )}
                    {label}
                    <span className="ml-1.5 text-xs opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pinned cards */}
        {/* Pinned cards */}
        {showTask.length !== 0 ? (
          <section className="mt-14 flex flex-col gap-14">
            {["pending", "in progress", "complete"].map((status) => {
              const rowTasks = showTask.filter(
                (task) => task.status === status,
              );

              return (
                <div key={status}>
                  {/* Row heading */}
                  <div className="mb-8 flex items-center gap-3">
                    <h3 className="font-['Caveat',cursive] text-3xl capitalize text-neutral-700">
                      {status}
                    </h3>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-500 shadow-sm ring-1 ring-black/[0.05]">
                      {rowTasks.length}
                    </span>
                    <div className="h-px flex-1 border-t border-dashed border-neutral-300" />
                  </div>

                  {rowTasks.length !== 0 ? (
                    <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:grid-cols-3">
                      {rowTasks.map((task) => {
                        return (
                          <article
                            key={task.id}
                            className={`${shell}`}
                          >
                            {task.isDueDate && (
                              <span className="m-2 inline-block rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                                Due Date
                              </span>
                            )}
                            <span
                              className={`${pin} bg-gradient-to-br ${
                                task.priority === "Hard"
                                  ? "from-[#E4572E] to-[#C13A1A]"
                                  : task.priority === "Medium"
                                    ? "from-[#60A5FA] to-[#2563EB]"
                                    : "from-[#2FB67C] to-[#259C6A]"
                              } shadow-[0_3px_8px_rgba(53,82,224,0.3)]`}
                            />

                            <div
                              className={`rounded-3xl border border-[#4A6CF7]/10 p-5 pt-7 ${task.priority === "Hard" ? "bg-gradient-to-br from-[#FEEFE9] via-[#FDE8E0] to-[#FDE3D9]" : task.priority === "Medium" ? "bg-gradient-to-br from-[#E6ECFF] via-[#EEF0FF] to-[#F3EEFF]" : "bg-gradient-to-br from-[#E6F7F1] via-[#EAF8F4] to-[#EFF9F7]"} sm:p-6 sm:pt-8`}
                            >
                              <p
                                className={`font-['Caveat',cursive]  ${task.priority === "Hard" ? "text-[#E4572E]" : task.priority === "Medium" ? "text-[#3B57D6]" : "text-[#2FB67C]"} text-2xl`}
                              >
                                {task.status}
                              </p>

                              <h2 className="mt-2 text-xl font-semibold tracking-tight text-neutral-900">
                                {task.title}
                              </h2>

                              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                                {task.description}
                              </p>

                              <div className="mt-4 flex items-center justify-between gap-3">
                                <p className="flex items-center gap-2 text-sm text-neutral-600">
                                  <CalendarIcon />
                                  Due {task.dueDate}
                                </p>

                                <span
                                  className={`rounded-full bg-white/70 px-3 py-1 text-xs ${task.priority === "Hard" ? "text-[#E4572E]" : task.priority === "Medium" ? "text-[#3B57D6]" : "text-[#2FB67C]"} font-medium`}
                                >
                                  {task.priority}
                                </span>
                              </div>

                              {/* Status */}
                              <div
                                role="group"
                                aria-label="Task status"
                                className="mt-4 flex flex-wrap items-center gap-1"
                              >
                                {["pending", "in progress", "complete"].map(
                                  (s) => (
                                    <button
                                      key={s}
                                      type="button"
                                      onClick={() => handleToggle(task.id, s)}
                                      aria-pressed={s === task.status}
                                      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                                        s === task.status
                                          ? "bg-white shadow-sm ring-1 ring-[#3B57D6]/10"
                                          : "text-neutral-500 hover:bg-white/60 hover:text-neutral-800"
                                      }`}
                                    >
                                      {s}
                                    </button>
                                  ),
                                )}
                              </div>

                              <div className="mt-4 flex items-center justify-between border-t border-[#3B57D6]/10 pt-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    dispatch(toggleUpdate(task));
                                    navigate("/add-task-form");
                                  }}
                                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition hover:bg-white/70"
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M12 20h9" />
                                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                                  </svg>
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() => dispatch(deleteTask(task.id))}
                                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-50/80"
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M3 6h18" />
                                    <path d="M8 6V4h8v2" />
                                    <path d="m19 6-1 14H6L5 6" />
                                    <path d="M10 11v5m4-5v5" />
                                  </svg>
                                  Delete
                                </button>
                              </div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-[2rem] border border-dashed border-neutral-300 p-8 text-center">
                      <p className="text-sm text-neutral-500">
                        No {status} tasks
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-[2rem] border border-dashed border-neutral-300 p-10 text-center sm:col-span-2">
            <p className="font-medium">No tasks available</p>
          </div>
        )}
      </div>
    </div>
  );
}
