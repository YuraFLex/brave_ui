import React from 'react';
import s from './Navigation.module.scss';

// import { RxHamburgerMenu } from 'react-icons/rx';
import { TbReportSearch } from 'react-icons/tb';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaUserCog } from 'react-icons/fa';
import logo from '../../images/logo.png';

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
                <MdSpaceDashboard className={s.iconMenuMobile} />
                <p>Board</p>
              </Link>
            </li>
            <li className={s.navItemMobile}>
              <Link to="reports">
                <TbReportSearch className={s.iconMenuMobile} />
                <p>Reports</p>
              </Link>
            </li>
            <li className={s.navItemMobile}>
              <Link to="usersetting">
                <FaUserCog className={s.iconMenuMobile} />
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
