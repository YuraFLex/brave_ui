import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { statisticsReducer } from './statistics/statisticsSlice';
import { changePasswordReducer } from './changePassword/changePasswordSlice';
import { endPointReducer } from './endPoints/endPointSlice';
import { summaryReportsReducer } from './reports/summaryReports/summaryReportsSlice';

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

const summaryReportsPersistConfig = {
  key: 'summaryReports',
  storage,
}

const summaryReportsPersistedReducer = persistReducer(summaryReportsPersistConfig, summaryReportsReducer)


export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    statistics: statisticsPersistedReducer,
    changePassword: changePasswordPersistedReducer,
    endPoint: endPointPersistedReducer,
    summaryReports: summaryReportsPersistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
