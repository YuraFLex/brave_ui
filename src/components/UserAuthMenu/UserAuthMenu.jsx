import { LogOutButton } from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsActive,
  selectIsUserName,
  selectIsUserLastName,
} from 'redux/auth/authSelectors';
import { logout } from '../../redux/auth/authSlice';

import s from './UserAuthMenu.module.scss';

export const UserAuthMenu = () => {
  const dispatch = useDispatch();
  const firstName = useSelector(selectIsUserName);
  const lastName = useSelector(selectIsUserLastName);
  const isActive = useSelector(selectIsActive);

  const isAccessAllowed = Boolean(isActive);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={s.userAuthMenu}>
      <span className={s.userInfo}>
        <span>Welcome:</span>
        <span className={s.userInfoDescr}>{firstName}</span>
        <span className={s.userInfoDescr}>{lastName}</span>
      </span>
      {isAccessAllowed && <LogOutButton clickHeandler={handleLogout} />}
    </div>
  );
};
