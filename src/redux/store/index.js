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
import roomReducer from "../reducers/roomReducer";
import toursReducer from "../reducers/toursReducer";
import deluxeReducer from "../reducers/deluxeReducer";
import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_PERSIST_KEY,
    }),
  ],
};

const rootReducer = combineReducers({
  register: registerReducer,
  user: userReducer,
  travel: travelReducer,
  deluxe: deluxeReducer,
  tours: toursReducer,
  rooms: roomReducer,
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
