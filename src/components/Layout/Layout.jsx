import { Outlet } from 'react-router';
import { AppBar } from 'components/AppBar/AppBar';

// import { Navigation } from 'components/Navigation/Navigation';

// import s from './Layout.module.scss';
// import { Header } from 'components/Header/Header';

export const Layout = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};
