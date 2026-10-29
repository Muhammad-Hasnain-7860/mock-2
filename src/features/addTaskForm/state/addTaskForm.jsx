import { createSlice } from "@reduxjs/toolkit";

const addTaskSlice = createSlice({
  name: "add Task",
  initialState: {
    tasks: [],
    update : null
  },

  reducers: {
    addTask: (state, action) => {
      state.tasks = action.payload;
    },
    updateTask: (state, action) => {
      const updated = state.tasks.map((task) => {
        return task.id === action.payload.id
          ? { ...action.payload.data , status : task.status ,  id : task.id}
          : task;
      });

      state.tasks = updated;
      localStorage.setItem("tasks", JSON.stringify(updated));
    },
    deleteTask: (state, action) => {
      const updated = state.tasks.filter((task) => {
        return task.id !== action.payload;
      });

      state.tasks = updated;
      localStorage.setItem("tasks", JSON.stringify(updated));
    },
    toggleUpdate : (state, action) => {
      state.update = action.payload
    }
  },
});

export const { addTask, updateTask, deleteTask , toggleUpdate} = addTaskSlice.actions;

export default addTaskSlice.reducer;
