import { LogOutButton } from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName } from 'redux/auth/authSelectors';
import { logout } from 'redux/auth/authOperations';

import s from './UserAuthMenu.module.scss';

export const UserAuthMenu = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectUserName);

  const clickHeandler = () => {
    dispatch(logout());
  };
  return (
    <div className={s.userAuthMenu}>
      <p>Welcome: {name}</p>
      <LogOutButton clickHeandler={clickHeandler} />
    </div>
  );
};
