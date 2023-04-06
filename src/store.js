// import configureStore
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";

// create store
export const store = configureStore({
  // contains all the reducer functions which will be used
  reducer: {
    login: loginReducer
  }
});
