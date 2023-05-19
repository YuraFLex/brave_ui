import { useSelector } from 'react-redux';
import { selectIsLoginIn } from 'redux/auth/authSelectors';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const isLogedIn = useSelector(selectIsLoginIn);
  return isLogedIn ? children : <Navigate to="/login" />;
};
