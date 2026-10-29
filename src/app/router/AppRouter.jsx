import { createBrowserRouter, RouterProvider } from "react-router";
import Test from "../../test/Test";
import Form from "../../features/addTaskForm/ui/components/Form";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../features/addTaskForm/state/addTaskForm";
import TaskDashboard from "../../features/showTask/ui/components/AllTasks";

const AppRouter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const today = new Date().toLocaleDateString("en-CA");
    const updatedTasks = tasks.map((task) => {
      return task.dueDate <= today
        ? { ...task, isDueDate: true }
        : { ...task, isDueDate: false };
    });
    dispatch(addTask(updatedTasks));
    console.log(updatedTasks, "updatedTasks");
    dispatch(addTask(updatedTasks));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <TaskDashboard />,
    },
    {
      path: "/add-task-form",
      element: <Form />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />;
      <Toaster />
    </>
  );
};

export default AppRouter;
