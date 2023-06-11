export const selectStatisticsData = state => {
    return state?.statistics?.statisticsData;
};

export const selectIsLoadingStatistics = state => {
    return state?.statistics?.isLoading;
};

export const selectStatisticsError = state => {
    return state?.statistics?.error;
};
