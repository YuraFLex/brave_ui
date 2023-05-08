export const selectUserName = state => {
  return state?.auth?.user?.name;
};
export const selectUserEmail = state => {
  return state?.auth?.user?.email;
};
export const selectToken = state => {
  return state.auth.token;
};
export const selectIsLoginIn = state => {
  return state.auth.isLoggedIn;
};
export const selectIsLoading = state => {
  return state.auth.isLoading;
};
export const selectError = state => {
  return state.auth.error;
};
