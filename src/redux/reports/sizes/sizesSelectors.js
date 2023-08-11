export const sizesData = state => {
    return state?.sizes?.sizesList;
}

export const sizesIsLoading = state => {
    return state?.sizes?.isLoading;
}

export const sizesError = state => {
    return state?.sizes?.error;
}