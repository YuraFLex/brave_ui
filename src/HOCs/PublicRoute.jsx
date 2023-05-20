import {
  //  useDispatch,
  useSelector,
} from 'react-redux';
import {
  selectIsLoginIn,
  // selectIsActive,
  // selectUserId,
} from 'redux/auth/authSelectors';
import { Navigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { getIsActive } from 'redux/auth/authOperations';

export const PublicRoute = ({ children, restricted = false }) => {
  // const dispatch = useDispatch();
  // const id = useSelector(selectUserId);
  // const isActiveValue = useSelector(selectIsActive);
  // const isActive = isActiveValue === 1;
  // console.log('isActive in PublicteRoute:', isActive);

  // useEffect(() => {
  //   dispatch(getIsActive(id));
  // }, [dispatch, id]);

  const isLogedIn = useSelector(selectIsLoginIn);
  const shouldRedirect = isLogedIn && restricted;
  return shouldRedirect ? <Navigate to="/" /> : children;
};
