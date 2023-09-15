export const chartsData = state => {
    return state?.chartData?.chartData;
}

export const chartIsLoading = state => {
    return state?.chartData?.isLoading;
}

export const chartError = state => {
    return state?.chartData?.error;
}