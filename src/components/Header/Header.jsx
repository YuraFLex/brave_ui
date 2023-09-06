import { UserAuthMenu } from 'components/UserAuthMenu/UserAuthMenu';
// import logo from '../../images/logo.png';
import { useSelector } from 'react-redux';
import { authIsActive } from 'redux/auth/authSelectors';
import s from './Header.module.scss';
import { NavigationMobile } from 'components/Navigation/NavigationMobile';

export const Header = () => {
  const isActive = useSelector(authIsActive);
  const isAccessAllowed = Boolean(isActive);
  return (
    <>
      <header className={s.header}>
        {isAccessAllowed && <NavigationMobile />}
        <div className={s.headerMenu}>
          <UserAuthMenu />
        </div>
      </header>
    </>
  );
};
