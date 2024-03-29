import { useSelector } from 'react-redux';
import { isLoginIn, authIsActive } from 'redux/auth/authSelectors';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(isLoginIn);
  const isActive = useSelector(authIsActive);

  const isAccessAllowed = Boolean(isActive);

  if (isLoggedIn && isAccessAllowed) {
    return children;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!isActive) {
    return <Navigate to="/accessdenied" />;
  }
};
