import { useSelector } from 'react-redux';
import {
  userEmail,
  userType,
  userName,
  userLastName,
  userLegalName,
} from 'redux/auth/authSelectors';

import s from './UserInfo.module.scss';

export const UserInfo = () => {
  const firstName = useSelector(userName);
  const lastName = useSelector(userLastName);
  const legalName = useSelector(userLegalName);
  const usersEmail = useSelector(userEmail);
  const usersType = useSelector(userType);

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
            <h4>Email:</h4> <p>{usersEmail}</p>
          </li>
          <li className={s.UserInfoItem}>
            <h4>Type:</h4> <p>{usersType}</p>
          </li>
          <li className={s.UserInfoItem}>
            <h4>Legal Name:</h4> <p>{legalName}</p>
          </li>
        </ul>
      </div>
    </>
  );
};
