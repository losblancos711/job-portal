import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobs/jobSlice";
import filterReducer from "./filter/filterSlice";

// Redux store for state management
export const store = configureStore({
  reducer: { jobs: jobReducer, filters: filterReducer },
  middleware: (gDM) =>
    gDM({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
