import { useSelector } from 'react-redux';
import { isLoginIn } from 'redux/auth/authSelectors';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children, restricted = false }) => {
  const isLogedIn = useSelector(isLoginIn);
  const shouldRedirect = isLogedIn && restricted;

  return shouldRedirect ? <Navigate to="/" /> : children;
};
