// import { useEffect } from 'react';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';
import {
  selectIsLoginIn,
  // selectIsActive,
  // selectUserId,
} from 'redux/auth/authSelectors';
import { Navigate } from 'react-router-dom';
// import { getIsActive } from 'redux/auth/authOperations';

export const PrivateRoute = ({ children }) => {
  // const dispatch = useDispatch();
  // const id = useSelector(selectUserId);
  // const isActiveValue = useSelector(selectIsActive);
  // const isActive = isActiveValue === 1;
  // console.log('isActive in PrivateRoute:', isActive);

  // useEffect(() => {
  //   dispatch(getIsActive(id));
  // }, [dispatch, id]);

  const isLogedIn = useSelector(selectIsLoginIn);
  return isLogedIn ? children : <Navigate to="/login" />;
};
