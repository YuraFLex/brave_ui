import { useState } from 'react';
import { userId } from 'redux/auth/authSelectors';

import s from './ChangeUserPassword.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from 'redux/changePassword/changePasswordOperations';
import { changePasswordIsLoading } from 'redux/changePassword/changePasswordSelectors';
import { BraveLogo } from 'components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 500,
  width: '100%',
  maxHeight: 400,
  height: '100%',
  border: '1px solid #e0e0e0',
  padding: theme.spacing(2),
  boxShadow: '4px 2px 9px 2px rgba(0, 0, 0, 0.4)',
}));

export const ChangeUserPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const usersId = useSelector(userId);
  const isLoadnig = useSelector(changePasswordIsLoading);

  const handleOldPassword = e => {
    setOldPassword(e.target.value);
  };

  const handleNewPassword = e => {
    setNewPassword(e.target.value);
  };

  const handleConfrimPassword = e => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      const passwordData = {
        user_id: usersId,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };
      dispatch(changePassword(passwordData));
      console.log('passwordData:', passwordData);

      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast.error(
        'New password and confirmation password do not match, please try again'
      );
      setOldPassword(oldPassword);
      setNewPassword(newPassword);
      setConfirmPassword(confirmPassword);
    }
  };

  return (
    <DemoPaper square={false}>
      {isLoadnig && <BraveLogo />}
      <ToastContainer />
      <form className={s.ChangeUserPasswordForm} onSubmit={onSubmit}>
        <h3 className={s.ChangeUserPasswordTitile}>
          To change your password, fill out the fields below:
        </h3>
        <label className={s.ChangeUserPasswordLabel}>
          <input
            className={s.ChangeUserPasswordInput}
            type={showPassword ? 'text' : 'password'}
            placeholder="********"
            onChange={handleOldPassword}
            value={oldPassword}
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
            onChange={handleNewPassword}
            value={newPassword}
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
            onChange={handleConfrimPassword}
            value={confirmPassword}
          />
          <span className={s.ChangeUserPasswordLabelText}>
            Confirm Password
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
        <Button
          variant="contained"
          style={{ backgroundColor: '#0099fa', textTransform: 'capitalize' }}
          type="submit"
        >
          Change Password
        </Button>
      </form>
    </DemoPaper>
  );
};
