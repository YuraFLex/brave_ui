import React from 'react';
import s from './Navigation.module.scss';

import logo from '../../images/logo.png';

import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

import { useDispatch, useSelector } from 'react-redux';
import { selectIsActive } from 'redux/auth/authSelectors';
import { Link } from './Navigation.styled';
// import cn from 'classnames';
import { LogOutButtonMobile } from 'components/Button/Button';
import { logout } from 'redux/auth/authSlice';

export const NavigationMobile = () => {
  const dispatch = useDispatch();
  const isActive = useSelector(selectIsActive);
  const isAccessAllowed = Boolean(isActive);
  // const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={s.mobNav}>
      {isAccessAllowed && (
        <>
          <ul className={s.navlistMob}>
            <li className={s.navItemMobile}>
              <Link to="/" end>
                <SpaceDashboardOutlinedIcon className={s.iconMenuMobile} />
                <p>Board</p>
              </Link>
            </li>
            <li className={s.navItemMobile}>
              <Link to="reports">
                <AssessmentOutlinedIcon className={s.iconMenuMobile} />
                <p>Reports</p>
              </Link>
            </li>
            <li className={s.navItemMobile}>
              <Link to="usersetting">
                <ManageAccountsOutlinedIcon className={s.iconMenuMobile} />
                <p>User</p>
              </Link>
            </li>
          </ul>
          <a className="link" href="/">
            <img className={s.logoMobile} src={logo} alt="logo" />
          </a>

          {isAccessAllowed && (
            <LogOutButtonMobile clickHeandler={handleLogout} />
          )}
        </>
      )}
    </nav>
  );
};
