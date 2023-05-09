import { useSelector } from 'react-redux';
import { selectIsLoginIn } from 'redux/auth/authSelectors';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children, restricted = false }) => {
  const isAuth = useSelector(selectIsLoginIn);
  const shouldRedirect = isAuth && restricted;
  return shouldRedirect ? <Navigate to="/" /> : children;
};
