import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTask, toggleUpdate, updateTask } from "../state/addTaskForm";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router";
const useAddTask = () => {
  const { update } = useSelector((store) => store.AddTaskSlice);

  const { reset, register, handleSubmit } = useForm({
    defaultValues: {
      title: update ? update.title : "",
      description: update ? update.description : "",
      dueDate: update ? update.dueDate : "",
      priority: update ? update.priority : "Medium",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTask = (data) => {
    if (update) {
      data.isDueDate = data.dueDate <= new Date().toLocaleDateString("en-CA") ? true : false;
      dispatch(updateTask({ id: update.id, data }));
      dispatch(toggleUpdate(null));
      reset({
        title: "",
        description: "",
        dueDate: "",
        priority: "Easy",
      });
      toast.success("Task Updated SuccessFully");
      return;
    }

    data.id = nanoid();
    data.status = "pending";
    data.isDueDate = data.dueDate <= new Date().toLocaleDateString("en-CA") ? true : false;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(data);
    dispatch(addTask(tasks));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    toast.success("Task Added SuccessFully");
    reset();
  };

  const handleError = (errors) => {
    const error = Object.keys(errors)[0];
    toast.error(errors[error].message);
  };

  return {
    handleSubmit,
    register,
    handleAddTask,
    handleError,
    navigate,
    dispatch,
    toggleUpdate,
    update
  };
};

export default useAddTask;
