import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { statisticsReducer } from './statistics/statisticsSlice';
import { endPointReducer } from './endPoints/endPointSlice';

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
import { changePasswordReducer } from './changePassword/changePasswordSlice';

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

const changePasswordPersistConfig = {
  key: 'changePassword',
  storage,
}
const changePasswordPersistedReducer = persistReducer(changePasswordPersistConfig, changePasswordReducer)

const endPointPersistConfig = {
  key: 'endpoint',
  storage,
}

const endPointPersistedReducer = persistReducer(endPointPersistConfig, endPointReducer)

export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    statistics: statisticsPersistedReducer,
    changePassword: changePasswordPersistedReducer,
    endPoint: endPointPersistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
