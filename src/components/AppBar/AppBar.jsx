import { useSelector } from 'react-redux';
import { isLoginIn } from 'redux/auth/authSelectors';
import { Navigation } from 'components/Navigation/Navigation';
import { Header } from 'components/Header/Header';

export const AppBar = () => {
  const isLogedIn = useSelector(isLoginIn);

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
