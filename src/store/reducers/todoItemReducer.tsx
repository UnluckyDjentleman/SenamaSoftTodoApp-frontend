import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import TodoItem from "../../constants/todoItem";

const initialState: {
  items: TodoItem[];
  error: string | null;
  load: boolean;
} = {
  items: [],
  error: null,
  load: false,
};

export const todoReducer = createSlice({
  name: "items",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setLoad: (state, action: PayloadAction<{ load: boolean }>) => {
      state.load = action.payload.load;
    },
    setTodoItems: (state, action: PayloadAction<{ items: TodoItem[] }>) => {
      state.items = action.payload.items;
    },
    addTodoItem: (state, action: PayloadAction<{ item: TodoItem }>) => {
      state.items.push(action.payload.item);
    },
    updateTodoItem: (state, action: PayloadAction<{ item: TodoItem }>) => {
      const index = state.items.findIndex(
        (el) => el.id === action.payload.item.id
      );
      if (index !== -1) {
        state.items[index] = action.payload.item;
      }
    },
    removeTodoItem: (state, action: PayloadAction<{ item: TodoItem }>) => {
      state.items = state.items.filter(
        (el) => el.id !== action.payload.item.id
      );
    },
  },
});

export const {
  setTodoItems,
  addTodoItem,
  updateTodoItem,
  removeTodoItem,
  setLoad,
  setError,
} = todoReducer.actions;

export default todoReducer.reducer;