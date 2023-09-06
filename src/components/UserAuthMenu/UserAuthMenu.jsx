import { LogOutButton } from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  authIsActive,
  userName,
  userLegalName,
} from 'redux/auth/authSelectors';
import { logout } from '../../redux/auth/authSlice';

import s from './UserAuthMenu.module.scss';

export const UserAuthMenu = () => {
  const dispatch = useDispatch();
  const firstName = useSelector(userName);
  const companyName = useSelector(userLegalName);
  const isActive = useSelector(authIsActive);

  const isAccessAllowed = Boolean(isActive);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={s.userAuthMenu}>
      <span className={s.userInfo}>
        <span>Welcome:</span>
        <span className={s.userInfoDescr}>{firstName},</span>
        <span className={s.userInfoDescr}>{companyName}</span>
      </span>
      {isAccessAllowed && <LogOutButton clickHeandler={handleLogout} />}
    </div>
  );
};
