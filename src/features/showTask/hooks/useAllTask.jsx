import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, toggleUpdate } from "../../addTaskForm/state/addTaskForm";
import { useNavigate } from "react-router";

const useAllTask = () => {
  const { tasks } = useSelector((store) => store.AddTaskSlice);
  const [search, setSearch] = useState();
  const [showTask, setShowTask] = useState([...tasks]);
  const [category, setCategory] = useState(null);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!search && !category){
      setShowTask([...tasks]);
    }
  }, [tasks]);

  //   search , category

  useEffect(() => {
    const interval = setTimeout(() => {
      const filter = tasks.filter((task) => {
        return (
          task.title.toLowerCase().includes(search ? search.toLowerCase() : '') &&
          (category ? task.priority === category : true)
        );
      });
      setShowTask(filter);
    }, 700);

    return () => {
      clearTimeout(interval);
    };
  }, [search, tasks , category]);

  //   progress
  useEffect(() => {
    const updateProgress = tasks.filter((task) => {
      return task.status === "complete";
    });

    if(updateProgress.length === 0){
      setProgress(0)
      return 
    }

    const checkProgress = Math.floor(
      (updateProgress.length / tasks.length) * 100,
    );

    setProgress(checkProgress);
  }, [tasks]);

  const handleToggle = (id, value) => {
    const updated = tasks.map((task) => {
      return task.id === id ? { ...task, status: value } : task;
    });
    dispatch(addTask(updated));
    localStorage.setItem("tasks", JSON.stringify(updated));
  };


  return {
    setSearch,
    search,
    showTask,
    setCategory,
    progress,
    handleToggle,
    tasks,
    category,
    navigate,
    dispatch,
    toggleUpdate
  };
};

export default useAllTask;
