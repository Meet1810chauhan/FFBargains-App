import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import LoginSlice from './IsLoginSlice';

// Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, LoginSlice);

export const store = configureStore({
  reducer: {
    login: persistedReducer, // Change 'counter' to 'login' for better clarity
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore non-serializable actions
      },
    }),
});

// Persistor
export const persistor = persistStore(store);

// Type Definitions (for TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
