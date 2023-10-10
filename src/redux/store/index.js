import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import travelReducer from "../reducers/travelReducer";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import cartReducer from "../reducers/cartReducer";
import stayReducer from "../reducers/stayReducer";

import registerReducer from "../reducers/registerReducer";
import userReducer from "../reducers/userReducer";
import searchReducer from "../reducers/searchReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["register", "user", "travel", "stay", "cart"],
};

const rootReducer = combineReducers({
  register: registerReducer,
  user: userReducer,
  travel: travelReducer,
  search: searchReducer,
  stay: stayReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
