import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectUserEmail,
  selectUserType,
  selectUserPartner,
  selectIsUserName,
  selectIsUserLastName,
  selectIsUserLegalName,
} from 'redux/auth/authSelectors';

import s from './UserInfo.module.scss';
import { MdOutlineDone } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';

export const UserInfo = () => {
  const firstName = useSelector(selectIsUserName);
  const lastName = useSelector(selectIsUserLastName);
  const legalName = useSelector(selectIsUserLegalName);
  const userEmail = useSelector(selectUserEmail);
  const userType = useSelector(selectUserType);
  const userPartner = useSelector(selectUserPartner);
  const [fullName, setFullName] = useState(
    'Apple Inc., USA: Cupertino, California'
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = e => {
    setFullName(e.target.value);
  };

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
            <h4>Partner:</h4> <p>{userPartner}</p>
          </li>
          <li className={s.UserInfoItem}>
            <h4>Legal Name:</h4> <p>{legalName}</p>
            {/* {isEditing ? (
              <input
                className={s.UserInfoEditText}
                type="text"
                value={fullName}
                onChange={handleChange}
              />
            ) : (
              <span className={s.UserInfoAboutCompany}>
                {fullName}{' '}
                <button
                  onClick={handleEdit}
                  className={s.UserInfoBtnEdit}
                  style={{ marginLeft: '10px' }}
                >
                  <FaRegEdit />
                </button>
              </span>
            )}
            {isEditing && (
              <button onClick={handleSave} className={s.UserInfoBtnEdit}>
                <MdOutlineDone className={s.UserInfoBtnSave} />
              </button>
            )} */}
          </li>
        </ul>
      </div>
    </>
  );
};
