export const selectedDetaliedReportsData = state => {
    return state?.detailedReport?.detailedReportData;
}

export const selectedDetaliedReportsIsLoading = state => {
    return state?.detailedReport?.isLoading;
}

export const selectedDetaliedReportsError = state => {
    return state?.detailedReport?.error;
}