import { LogOutButton } from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserEmail } from 'redux/auth/authSelectors';
import { logout } from 'redux/auth/authOperations';

import s from './UserAuthMenu.module.scss';

export const UserAuthMenu = () => {
  const dispatch = useDispatch();
  const mail = useSelector(selectUserEmail);

  const clickHeandler = () => {
    dispatch(logout());
  };
  return (
    <div className={s.userAuthMenu}>
      <p>Welcome: {mail}</p>
      <LogOutButton text={'LogOut'} clickHeandler={clickHeandler} />
    </div>
  );
};
