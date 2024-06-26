import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import notificationReducer from './notification/notificationSlice'; // Import the notification slice
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine both reducers
const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer, // Add notification reducer
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['notification'], // Exclude notification from being persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
