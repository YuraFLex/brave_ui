import { useSelector } from 'react-redux';
import { selectToken } from 'redux/auth/authSelectors';

import { Navigation } from 'components/Navigation/Navigation';
import { Header } from 'components/Header/Header';

export const AppBar = () => {
  const token = useSelector(selectToken);

  return (
    <>
      {token && (
        <>
          <Header />
          <Navigation />
        </>
      )}
    </>
  );
};
