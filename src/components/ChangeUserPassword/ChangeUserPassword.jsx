import { useState } from 'react';
import { userId } from 'redux/auth/authSelectors';

import s from './ChangeUserPassword.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from 'redux/changePassword/changePasswordOperations';
import { changePasswordIsLoading } from 'redux/changePassword/changePasswordSelectors';
import { BraveLogo } from 'components/Loader/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Button } from 'components/Button/Button';

export const ChangeUserPassword = () => {
  const dispatch = useDispatch();
  const usersId = useSelector(userId);

  const [passwordData, setPasswordData] = useState({
    userId: usersId,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isLoadnig = useSelector(changePasswordIsLoading);

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
    return <BraveLogo />;
  }

  return (
    <div className={s.ChangeUserPasswordBox}>
      <ToastContainer />
      <form className={s.ChangeUserPasswordForm} onSubmit={onSubmit}>
        <h3>To change your password, fill out the fields below:</h3>
        <label className={s.ChangeUserPasswordLabel}>
          <input
            className={s.ChangeUserPasswordInput}
            type={showPassword ? 'text' : 'password'}
            placeholder="********"
            onChange={e =>
              setPasswordData({ ...passwordData, oldPassword: e.target.value })
            }
            value={passwordData.oldPassword}
          />
          <span className={s.ChangeUserPasswordLabelText}>Old Password</span>
          <i
            className={s.ChangeUserPasswordBtnIcon}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className={s.ChangeUserPasswordIcon} />
            ) : (
              <AiOutlineEye className={s.ChangeUserPasswordIconOpenEye} />
            )}
          </i>
        </label>
        <label className={s.ChangeUserPasswordLabel}>
          <input
            className={s.ChangeUserPasswordInput}
            type={showNewPassword ? 'text' : 'password'}
            placeholder="********"
            onChange={e =>
              setPasswordData({ ...passwordData, newPassword: e.target.value })
            }
            value={passwordData.newPassword}
          />
          <span className={s.ChangeUserPasswordLabelText}>New Password</span>
          <i
            className={s.ChangeUserPasswordBtnIcon}
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <AiOutlineEyeInvisible className={s.ChangeUserPasswordIcon} />
            ) : (
              <AiOutlineEye className={s.ChangeUserPasswordIconOpenEye} />
            )}
          </i>
        </label>
        <label className={s.ChangeUserPasswordLabel}>
          <input
            className={s.ChangeUserPasswordInput}
            type={showConfirmPassword ? 'text' : 'password'}
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
          <i
            className={s.ChangeUserPasswordBtnIcon}
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible className={s.ChangeUserPasswordIcon} />
            ) : (
              <AiOutlineEye className={s.ChangeUserPasswordIconOpenEye} />
            )}
          </i>
        </label>
        <Button type="submit" text="Change Password" />
      </form>
    </div>
  );
};
