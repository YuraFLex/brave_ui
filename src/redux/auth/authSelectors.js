export const userName = state => {
  return state?.auth?.user?.first_name;
}
export const userLastName = state => {
  return state?.auth?.user?.last_name;
}
export const userLegalName = state => {
  return state?.auth?.user?.legal_name;
}
export const userEmail = state => {
  return state?.auth?.user?.email;
};
export const userId = state => {
  return state?.auth?.user?.id;
}
export const userType = state => {
  return state?.auth?.user?.type
}
export const userPartner = state => {
  return state?.auth?.user?.partner
}
export const userPartnerId = state => {
  return state?.auth?.user?.partner_id
}
export const isLoginIn = state => {
  return state.auth.isLoggedIn;
};
export const authIsLoading = state => {
  return state.auth.isLoading;
};
export const selectError = state => {
  return state.auth.error;
};
export const authIsActive = state => {
  return state?.auth?.user?.isActive;
}
