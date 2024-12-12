// Importing react modules
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Importing slices
import globals from "./Globals";

const reducers = combineReducers({
  globals,
});

const persistConfig = {
  key: "myhometab",
  version: 1,
  storage,
  whitelist: ["globals"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // immutableCheck: false,
      // actionCreatorCheck: false,
    });

    return middlewares;
  },
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
