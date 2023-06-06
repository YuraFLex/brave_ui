import { Link } from './Navigation.styled';

import { TbReportSearch } from 'react-icons/tb';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaUserCog } from 'react-icons/fa';

import s from './Navigation.module.scss';
import { useSelector } from 'react-redux';
import { selectIsActive } from 'redux/auth/authSelectors';

export const Navigation = () => {
  const isActive = useSelector(selectIsActive);

  const isAccessAllowed = Boolean(isActive);
  return (
    <nav className={s.nav}>
      {isAccessAllowed && (
        <ul className={s.navlist}>
          <li className={s.navItem}>
            <Link to="/" end>
              <span>
                <MdSpaceDashboard className={s.icon} />
              </span>
              Dashboard
            </Link>
          </li>
          <li className={s.navItem}>
            <Link to="reports">
              <span>
                <TbReportSearch className={s.icon} />
              </span>
              Reports
            </Link>
          </li>
          <li className={s.navItem}>
            <Link to="usersetting">
              <span>
                <FaUserCog className={s.icon} />
              </span>
              User Settings
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
