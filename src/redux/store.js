import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { statisticsReducer } from './statistics/statisticsSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
  whiteList: ['isActive'],
};

const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

const statisticsPersistConfig = {
  key: 'statistics',
  storage,
};

const statisticsPersistedReducer = persistReducer(statisticsPersistConfig, statisticsReducer);

export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    statistics: statisticsPersistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
