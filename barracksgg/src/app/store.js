import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/counter/appSlice";

export default configureStore({
  reducer: {
    app: appReducer,
  },
});
