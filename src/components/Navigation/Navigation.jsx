import { Link } from './Navigation.styled';

import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import Fade from '@mui/material/Fade';

import { useDispatch, useSelector } from 'react-redux';
import { authIsActive } from 'redux/auth/authSelectors';
import { changeMenuOpen } from 'redux/action/menuOpen';
import { LightTooltip } from './constans';
import s from './Navigation.module.scss';

export const Navigation = () => {
  const isActive = useSelector(authIsActive);
  const menuOpen = useSelector(state => state.menuOpen);
  const dispatch = useDispatch();

  const handleToggleMenu = () => {
    dispatch(changeMenuOpen(!menuOpen));
  };

  const isAccessAllowed = Boolean(isActive);
  return (
    <nav className={s.nav}>
      {isAccessAllowed && (
        <ul className={` ${menuOpen ? s.menuOpen : ''} ${s.navlist}`}>
          <li className={s.navItem}>
            <button onClick={handleToggleMenu} className={s.openMenuBtn}>
              {menuOpen ? (
                <KeyboardDoubleArrowLeftOutlinedIcon className={s.icon} />
              ) : (
                <MenuOutlinedIcon className={s.icon} />
              )}
            </button>
          </li>
          <li className={s.navItem}>
            <Link to="/" end>
              {menuOpen ? (
                <span>
                  <SpaceDashboardOutlinedIcon className={s.icon} />
                </span>
              ) : (
                <LightTooltip
                  title="Dashboard"
                  placement="right"
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 300 }}
                  arrow
                >
                  <span>
                    <SpaceDashboardOutlinedIcon className={s.icon} />
                  </span>
                </LightTooltip>
              )}
              <span className={`${s.linkName} ${menuOpen ? s.menuOpen : ''}`}>
                Dashboard
              </span>
            </Link>
          </li>
          <li className={s.navItem}>
            <Link to="reports">
              {menuOpen ? (
                <span>
                  <AssessmentOutlinedIcon className={s.icon} />
                </span>
              ) : (
                <LightTooltip
                  title="Reports"
                  placement="right"
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 300 }}
                  arrow
                >
                  <span>
                    <AssessmentOutlinedIcon className={s.icon} />
                  </span>
                </LightTooltip>
              )}
              <span className={`${s.linkName} ${menuOpen ? s.menuOpen : ''}`}>
                Reports
              </span>
            </Link>
          </li>
          <li className={s.navItem}>
            <Link to="usersetting">
              {menuOpen ? (
                <span>
                  <ManageAccountsOutlinedIcon className={s.icon} />
                </span>
              ) : (
                <LightTooltip
                  title="User Settings"
                  placement="right"
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 300 }}
                  arrow
                >
                  <span>
                    <ManageAccountsOutlinedIcon className={s.icon} />
                  </span>
                </LightTooltip>
              )}
              <span className={`${s.linkName} ${menuOpen ? s.menuOpen : ''}`}>
                User Settings
              </span>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
