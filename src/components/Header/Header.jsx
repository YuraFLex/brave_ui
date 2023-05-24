import { UserAuthMenu } from 'components/UserAuthMenu/UserAuthMenu';
// import logo from '../../images/logo.png';
import { useSelector } from 'react-redux';
import { selectIsActive } from 'redux/auth/authSelectors';
import s from './Header.module.scss';
import { NavigationMobile } from 'components/Navigation/NavigationMobile';

export const Header = () => {
  const isActive = useSelector(selectIsActive);
  const isAccessAllowed = Boolean(isActive);
  return (
    <>
      <header className={s.header}>
        {isAccessAllowed && <NavigationMobile />}
        {/* <a className="link" href="/brave_ui">
          <img className={s.logo} src={logo} alt="logo" />
        </a> */}
        <div className={s.headerMenu}>
          {isAccessAllowed && (
            <ul className={s.menuList}>
              <li className={s.menuItem}>
                <span>Incoming QPS:</span>
                <span> 1</span>
              </li>
              <li className={s.menuItem}>
                <span>Outgoing QPS:</span>
                <span> 2</span>
              </li>
            </ul>
          )}
          <UserAuthMenu />
        </div>
      </header>
    </>
  );
};
