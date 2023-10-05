import { configureStore } from "@reduxjs/toolkit";
import travelReducer from "../reducers/travelReducer";

const store = configureStore({
  reducer: travelReducer,
});

export default store;
