import { useSelector } from 'react-redux';
import { selectIsLoginIn } from 'redux/auth/authSelectors';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(selectIsLoginIn);
  return isAuth ? children : <Navigate to="/login" />;
};
