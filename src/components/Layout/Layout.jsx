import { Outlet } from 'react-router';

import { Navigation } from 'components/Navigation/Navigation';

import s from './Layout.module.scss';
import { Header } from 'components/Header/Header';

export const Layout = () => {
  return (
    <>
      <Navigation />
      <div className={s.content}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
