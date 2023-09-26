import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import { statisticsReducer } from './statistics/statisticsSlice';
import { changePasswordReducer } from './changePassword/changePasswordSlice';
import { endPointReducer } from './endPoints/endPointSlice';
import { summaryReportsReducer } from './reports/summaryReports/summaryReportsSlice';
import { detailedReportReducer } from './reports/detailedReport/detailedReportSlice';
import { fetchSizesReducer } from './reports/sizes/sizesSlice';
import { chartReducer } from './chart/chartSlice';
import itemReducer from './statistics/itemSlice';
import statPeriodReducer from './statistics/statPeriodSlice'

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


const detailedReportPersistConfig = {
  key: 'detailedReport',
  storage,
}

const detailedReportPersistedReducer = persistReducer(detailedReportPersistConfig, detailedReportReducer)

const fetchSizesPersistConfig = {
  key: 'sizes',
  storage,
}

const fetchSizesPersistedReducer = persistReducer(fetchSizesPersistConfig, fetchSizesReducer)


const cahrtDataPersistConfig = {
  key: 'chartData',
  storage,
}

const cahrtDataPersistedReducer = persistReducer(cahrtDataPersistConfig, chartReducer)

export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    statistics: statisticsPersistedReducer,
    changePassword: changePasswordPersistedReducer,
    endPoint: endPointPersistedReducer,
    summaryReports: summaryReportsPersistedReducer,
    detailedReport: detailedReportPersistedReducer,
    sizes: fetchSizesPersistedReducer,
    chartData: cahrtDataPersistedReducer,
    item: itemReducer,
    period: statPeriodReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
