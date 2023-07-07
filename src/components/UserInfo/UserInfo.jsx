import { useSelector } from 'react-redux';
import {
  selectUserEmail,
  selectUserType,
  selectIsUserName,
  selectIsUserLastName,
  selectIsUserLegalName,
} from 'redux/auth/authSelectors';

import s from './UserInfo.module.scss';

export const UserInfo = () => {
  const firstName = useSelector(selectIsUserName);
  const lastName = useSelector(selectIsUserLastName);
  const legalName = useSelector(selectIsUserLegalName);
  const userEmail = useSelector(selectUserEmail);
  const userType = useSelector(selectUserType);

  return (
    <>
      <div className={s.UserInfoBox}>
        <ul className={s.UserInfoList}>
          <li className={s.UserInfoItem}>
            <h4>First Name:</h4> <p>{firstName}</p>
          </li>
          <li className={s.UserInfoItem}>
            <h4>Last Name:</h4> <p>{lastName}</p>
          </li>
          <li className={s.UserInfoItem}>
            <h4>Email:</h4> <p>{userEmail}</p>
          </li>
          <li className={s.UserInfoItem}>
            <h4>Type:</h4> <p>{userType}</p>
          </li>
          <li className={s.UserInfoItem}>
            <h4>Legal Name:</h4> <p>{legalName}</p>
          </li>
        </ul>
      </div>
    </>
  );
};
