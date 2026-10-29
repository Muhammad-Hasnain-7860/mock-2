import useAddTask from "../../hooks/useAddTask";

const field =
  "w-full rounded-2xl border border-black/[0.06] bg-white px-4 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400";

const label = "mb-2 block text-sm font-medium text-neutral-700";

export default function Form() {
  const {
    register,
    handleSubmit,
    handleAddTask,
    handleError,
    navigate,
    dispatch,
    toggleUpdate,
    update,
  } = useAddTask();

  return (
    <main className="min-h-screen bg-[#F3F3F5] bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_55px,rgba(0,0,0,0.045)_55px,rgba(0,0,0,0.045)_56px)] px-4 py-12 text-[#1B1B1F] antialiased sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[620px]">
        {/* Header */}
        <div className="mb-10 text-center">
          <button
            type="button"
            onClick={() => {
              navigate("/")
              dispatch(toggleUpdate(null))
            }}
            className="mb-5 inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm ring-1 ring-black/[0.06] transition hover:bg-neutral-50"
          >
            ← Back
          </button>
          <p className="text-sm text-neutral-500">
            My workspace <span className="mx-1">/</span> Tasks
          </p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight text-neutral-700 sm:text-5xl">
            Create task
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Add the details for your new task.
          </p>
        </div>

        {/* Pinned note */}
        <form
          onSubmit={handleSubmit(handleAddTask, handleError)}
          className="relative -rotate-[0.6deg] rounded-[2rem] bg-white p-3 shadow-[0_28px_50px_-20px_rgba(20,20,40,0.3)] ring-1 ring-black/[0.03]"
        >
          <span className="absolute -top-3 left-1/2 z-10 h-7 w-7 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#7F9BFF] to-[#3552E0] shadow-[0_3px_8px_rgba(53,82,224,0.3)]" />

          <div className="rounded-3xl border border-[#4A6CF7]/10 bg-gradient-to-br from-[#E6ECFF] via-[#EEF0FF] to-[#F3EEFF] p-5 pt-8 sm:p-8 sm:pt-10">
            <p className="font-['Caveat',cursive] text-2xl text-[#3B57D6]">
              New task
            </p>

            <div className="mt-4 space-y-5">
              <div>
                <label className={label}>
                  Task title <span className="text-[#E4572E]">*</span>
                </label>
                <input
                  {...register("title", {
                    required: "Title is Required",
                    minLength: {
                      value: 3,
                      message: "Title should be at least 3 characters",
                    },
                  })}
                  type="text"
                  placeholder="What needs to be done?"
                  className={field}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-neutral-700">
                    Description
                  </label>
                </div>
                <textarea
                  {...register("description", {
                    required: "Description is Required",
                    minLength: {
                      value: 8,
                      message: "Description should be at least 8 characters",
                    },
                  })}
                  rows={4}
                  placeholder="Add more details about this task..."
                  className={`${field} resize-y leading-6`}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={label}>Priority</label>
                  <select
                    {...register("priority", {
                      required: "Priority is Required",
                    })}
                    defaultValue="Medium"
                    className={field}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className={label}>Due date</label>
                  <input
                    type="date"
                    {...register("dueDate", {
                      required: "Due date is Required",
                    })}
                    className={field}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <p className="text-xs text-neutral-500">
                <span className="text-[#E4572E]">*</span> Required field
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    dispatch(toggleUpdate(null));
                    navigate("/");
                  }}
                  type="button"
                  className="rounded-full bg-white/80 px-5 py-2.5 text-sm font-medium text-neutral-700 shadow-sm ring-1 ring-black/[0.05] transition hover:bg-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-full bg-[#1B1B1F] px-6 py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-black focus:outline-none"
                >
                  {update ? "Update" : "Create"} task
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
