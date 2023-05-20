import { useSelector } from 'react-redux';
// import { useEffect } from 'react';

// import { getIsActive } from 'redux/auth/authOperations';
import {
  selectIsLoginIn,
  // selectIsActive,
  // selectUserId,
} from 'redux/auth/authSelectors';

import { Navigation } from 'components/Navigation/Navigation';
import { Header } from 'components/Header/Header';

export const AppBar = () => {
  // const dispatch = useDispatch();
  const isLogedIn = useSelector(selectIsLoginIn);
  // const id = useSelector(selectUserId);
  // const isActiveValue = useSelector(selectIsActive);
  // const isActive = isActiveValue === 1;
  // console.log(isActive);

  // useEffect(() => {
  //   dispatch(getIsActive(id));
  // }, []);

  return (
    <>
      {isLogedIn && (
        <>
          <Header />
          <Navigation />
        </>
      )}
    </>
  );
};
