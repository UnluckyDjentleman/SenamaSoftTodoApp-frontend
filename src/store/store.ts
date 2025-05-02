import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducers/todoItemReducer";
import filterReducer from "./reducers/filterReducer";

export const store = configureStore({
    reducer: {
      todo: todoReducer,
      filter: filterReducer
    },
});
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;