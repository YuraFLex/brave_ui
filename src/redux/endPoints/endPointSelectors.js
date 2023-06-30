export const selectIsEndPointList = state => {
    return state?.endPoint?.endPointList;
}

export const selectIsLoadingEndPoint = state => {
    return state?.endPoint?.isLoading;
}

export const selectIsEndPointError = state => {
    return state?.endPoint?.error
}