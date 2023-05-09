import { useSelector } from 'react-redux';
import { selectIsLoginIn } from 'redux/auth/authSelectors';

// import { AuthNavigation } from 'components/AuthNavigation/AuthNavigation';
import { Navigation } from 'components/Navigation/Navigation';
// import { UserAuthMenu } from 'components/UserAuthMenu/UserAuthMenu';
import { Header } from 'components/Header/Header';

export const AppBar = () => {
  const isAuth = useSelector(selectIsLoginIn);
  console.log('isAuth', isAuth);

  return (
    <>
      {isAuth && (
        <>
          <Header />
          <Navigation />
        </>
      )}
    </>
  );
};
