export const selectUserEmail = state => {
  return state?.auth?.user?.email;
};
export const selectUserId = state => {
  return state?.auth?.user?.id;
}
export const selectUserType = state => {
  return state?.auth?.user?.type
}
export const selectUserPartner = state => {
  return state?.auth?.user?.partner
}
export const selectUserPartnerId = state => {
  return state?.auth?.user?.partner_id
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
export const selectIsActive = state => {
  return state?.auth?.user?.isActive;
}
