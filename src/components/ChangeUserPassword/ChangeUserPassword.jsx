import { useState } from 'react';
import { selectUserId } from 'redux/auth/authSelectors';

import s from './ChangeUserPassword.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from 'redux/changePassword/changePasswordOperations';
import { selectIsLoadingchangePassword } from 'redux/changePassword/changePasswordSelectors';
import { LoaderNew } from 'components/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ChangeUserPassword = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  const [passwordData, setPasswordData] = useState({
    userId: userId,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const isLoadnig = useSelector(selectIsLoadingchangePassword);

  console.log('Айли юзера:', userId);
  console.log('Loader: ', isLoadnig);
  console.log('Данные для отправки на сервер:', passwordData);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(changePassword(passwordData));
    setPasswordData({
      userId,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  if (isLoadnig) {
    return <LoaderNew />;
  }

  return (
    <div className={s.ChangeUserPasswordBox}>
      <ToastContainer />
      <form className={s.ChangeUserPasswordForm} onSubmit={onSubmit}>
        <h3>To change your password, fill out the fields below:</h3>
        <label className={s.ChangeUserPasswordLabel}>
          <input
            className={s.ChangeUserPasswordInput}
            type="password"
            placeholder="********"
            onChange={e =>
              setPasswordData({ ...passwordData, oldPassword: e.target.value })
            }
            value={passwordData.oldPassword}
          />
          <span className={s.ChangeUserPasswordLabelText}>Old Password</span>
        </label>
        <label className={s.ChangeUserPasswordLabel}>
          <input
            className={s.ChangeUserPasswordInput}
            type="password"
            placeholder="********"
            onChange={e =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            value={passwordData.newPassword}
          />
          <span className={s.ChangeUserPasswordLabelText}>New Password</span>
        </label>
        <label className={s.ChangeUserPasswordLabel}>
          <input
            className={s.ChangeUserPasswordInput}
            type="password"
            placeholder="********"
            onChange={e =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
            value={passwordData.confirmPassword}
          />
          <span className={s.ChangeUserPasswordLabelText}>
            Confirm New Password
          </span>
        </label>
        <button className={s.ChangeUserPasswordSubmitBtn} type="submit">
          Change Password
        </button>
      </form>
    </div>
  );
};
