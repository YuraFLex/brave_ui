export const selectUserEmail = state => {
  return state?.auth?.user?.email;
};
export const selectUserType = state => {
  return state?.auth?.user?.type
}
export const selectUserPartner = state => {
  return state?.auth?.user?.partner
}
export const selectIsLoginIn = state => {
  return state.auth.isLoggedIn;
};
export const selectIsLoading = state => {
  return state.auth.isLoading;
};
export const selectError = state => {
  return state.auth.error;
};
