import { useSelector } from 'react-redux';
import { selectIsLoginIn } from 'redux/auth/authSelectors';

import { Navigation } from 'components/Navigation/Navigation';
import { Header } from 'components/Header/Header';

export const AppBar = () => {
  const isLogedIn = useSelector(selectIsLoginIn);

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
