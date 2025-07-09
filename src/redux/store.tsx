import {
  combineReducers,
  combineSlices,
  configureStore,
} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import LoginSlice from "./IsLoginSlice";
import userSlice from "./UserSlice";

// Persist Config:-
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// Persisted Reducer
// const persistedReducer = persistReducer(persistConfig, LoginSlice);

const rootReducer = combineReducers({
  login: persistReducer(persistConfig, LoginSlice),
  user: persistReducer(persistConfig, userSlice),
});

// const rootReducer = combineSlices({
//   login: persistReducer(persistConfig, LoginSlice),
//   user: userSlice,
// });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);

// Type Definitions (for TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
