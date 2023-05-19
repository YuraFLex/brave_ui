import { useSelector } from 'react-redux';
import { selectIsLoginIn } from 'redux/auth/authSelectors';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children, restricted = false }) => {
  const isLogedIn = useSelector(selectIsLoginIn);
  const shouldRedirect = isLogedIn && restricted;
  return shouldRedirect ? <Navigate to="/" /> : children;
};
