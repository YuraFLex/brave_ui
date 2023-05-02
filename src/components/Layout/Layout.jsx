import { Outlet } from 'react-router';

import { Navigation } from 'components/Navigation/Navigation';

import s from './Layout.module.scss';
import { Header } from 'components/Header/Header';

export const Layout = () => {
  return (
    <>
      <Header />
      <div className={s.content}>
        <Navigation />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
