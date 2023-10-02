import { useSelector } from 'react-redux';
import {
  userEmail,
  userType,
  userName,
  userLastName,
  userLegalName,
} from 'redux/auth/authSelectors';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

import s from './UserInfo.module.scss';

const DemoPaper = styled(Paper)(({ theme }) => ({
  minWidth: 280,
  maxHeight: 480,
  height: '100%',
  border: '1px solid #e0e0e0',
  padding: theme.spacing(3),
  boxShadow: '4px 2px 9px 2px rgba(0, 0, 0, 0.4)',
}));

export const UserInfo = () => {
  const firstName = useSelector(userName);
  const lastName = useSelector(userLastName);
  const legalName = useSelector(userLegalName);
  const usersEmail = useSelector(userEmail);
  const usersType = useSelector(userType);

  return (
    <div className={s.UserInfoBox}>
      <DemoPaper square={false}>
        <Avatar
          style={{
            width: '100px',
            height: '100px',
            margin: '0 auto',
            marginBottom: '10px',
            background: '#e0e0e0',
            border: '1px solid #ccc',
          }}
        >
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </Avatar>
        <ul className={s.UserInfoList}>
          <li className={s.UserInfoItem}>
            <h4 style={{ color: 'rgb(0 153 250 / 60%)', fontWeight: '100' }}>
              First Name:
            </h4>{' '}
            <p>{firstName}</p>
          </li>
          <li className={s.UserInfoItem}>
            <h4 style={{ color: 'rgb(0 153 250 / 60%)', fontWeight: '100' }}>
              Last Name:
            </h4>{' '}
            <p>{lastName}</p>
          </li>
          <li className={s.UserInfoItem}>
            <h4 style={{ color: 'rgb(0 153 250 / 60%)', fontWeight: '100' }}>
              Email:
            </h4>{' '}
            <p>{usersEmail}</p>
          </li>
          <li className={s.UserInfoItem}>
            <h4 style={{ color: 'rgb(0 153 250 / 60%)', fontWeight: '100' }}>
              Type:
            </h4>{' '}
            <p>{usersType}</p>
          </li>
          <li className={s.UserInfoItem}>
            <h4 style={{ color: 'rgb(0 153 250 / 60%)', fontWeight: '100' }}>
              Legal Name:
            </h4>{' '}
            <p>{legalName}</p>
          </li>
        </ul>
      </DemoPaper>
    </div>
  );
};
