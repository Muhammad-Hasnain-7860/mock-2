import { configureStore } from "@reduxjs/toolkit";
import AddTaskSlice from '../../features/addTaskForm/state/addTaskForm'
export const store = configureStore({
  reducer: {
    AddTaskSlice : AddTaskSlice
  }
})