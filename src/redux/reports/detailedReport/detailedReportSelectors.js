export const selectedDetaliedReportsData = state => {
    return state?.detailedReport?.detailedReportsData;
}

export const selectedDetaliedReportsIsLoading = state => {
    return state?.detailedReport?.isLoading;
}

export const selectedDetaliedReportsError = state => {
    return state?.detailedReport?.error;
}

export const selectIsSizes = state => {
    return state?.detailedReport?.sizesList;
}