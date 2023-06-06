import { useSelector } from 'react-redux';
import {
  selectUserEmail,
  selectUserType,
  selectUserPartner,
} from 'redux/auth/authSelectors';

import s from './UserInfo.module.scss';

export const UserInfo = () => {
  const userEmail = useSelector(selectUserEmail);
  const userType = useSelector(selectUserType);
  const userPartner = useSelector(selectUserPartner);
  return (
    <>
      <div className={s.UserInfoBox}>
        <ul className={s.UserInfoList}>
          <li className={s.UserInfoItem}>
            <h4>Email:</h4> <p>{userEmail}</p>
          </li>
          <li className={s.UserInfoItem}>
            <h4>Type:</h4> <p>{userType}</p>
          </li>
          <li className={s.UserInfoItem}>
            <h4>Partner:</h4> <p>{userPartner}</p>
          </li>
          <li className={s.UserInfoItem}>
            <h4>Full name, and legal company name:</h4>{' '}
            <p>Apple Inc., USA: Cupertino, California</p>
          </li>
        </ul>
      </div>
    </>
  );
};
