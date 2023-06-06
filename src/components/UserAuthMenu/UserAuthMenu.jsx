import { LogOutButton } from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserEmail,
  selectUserType,
  selectUserPartner,
  selectIsActive,
} from 'redux/auth/authSelectors';
import { logout } from '../../redux/auth/authSlice';

import s from './UserAuthMenu.module.scss';

export const UserAuthMenu = () => {
  const dispatch = useDispatch();
  const email = useSelector(selectUserEmail);
  const type = useSelector(selectUserType);
  const partner = useSelector(selectUserPartner);
  const isActive = useSelector(selectIsActive);

  const isAccessAllowed = Boolean(isActive);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={s.userAuthMenu}>
      <span className={s.userInfo}>
        Welcome: <span className={s.userInfoDescr}>{email}</span> Type:{' '}
        <span className={s.userInfoDescr}>{type}</span> Partner:{' '}
        <span className={`${s.userInfoDescr} ${s.userInfoDescrWidth}`}>
          {partner}
        </span>
      </span>
      {isAccessAllowed && <LogOutButton clickHeandler={handleLogout} />}
    </div>
  );
};
