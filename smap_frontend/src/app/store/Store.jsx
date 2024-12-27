import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalSlice from "../slices/modalSlice";

// Configuring the Redux store with necessary reducers and middleware
export const store = configureStore({
  reducer: {
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  },
});

// Setting up listeners for the store to enable features like automatic refetching
setupListeners(store.dispatch);

// Exporting all actions and selectors from slice
export * from "../slices/modalSlice";

