import { Link } from './Navigation.styled';

import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

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
                <SpaceDashboardOutlinedIcon className={s.icon} />
              </span>
              Dashboard
            </Link>
          </li>
          <li className={s.navItem}>
            <Link to="reports">
              <span>
                <AssessmentOutlinedIcon className={s.icon} />
              </span>
              Reports
            </Link>
          </li>
          <li className={s.navItem}>
            <Link to="usersetting">
              <span>
                <ManageAccountsOutlinedIcon className={s.icon} />
              </span>
              User Settings
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
