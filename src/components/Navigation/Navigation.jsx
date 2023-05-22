import { Link } from './Navigation.styled';

import { TbReportSearch } from 'react-icons/tb';
import { MdSpaceDashboard } from 'react-icons/md';

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
          <li>
            <Link to="/" end>
              <span>
                <MdSpaceDashboard className={s.icon} />
              </span>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="reports">
              <span>
                <TbReportSearch className={s.icon} />
              </span>
              Reports
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
