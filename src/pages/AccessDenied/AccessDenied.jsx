import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isLoginIn } from 'redux/auth/authSelectors';
import { logout } from 'redux/auth/authSlice';
import { CiFaceFrown } from 'react-icons/ci';
import Button from '@mui/material/Button';

import s from './AccessDenied.module.scss';

export const AccessDenied = () => {
  const dispatch = useDispatch();
  const isLogedIn = useSelector(isLoginIn);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={s.warningConteiner}>
      <div className={s.content}>
        <CiFaceFrown className={s.warningIcon} />
        <div className={s.warningContent}>
          <h1 className={s.warning}>Access denied!</h1>
          <h2 className={s.warningAbout}>
            Access to your account is temporarily restricted, please contact
            your administrator for details.
          </h2>
          {isLogedIn && (
            <Button
              variant="contained"
              style={{
                backgroundColor: '#0099fa',
              }}
              onClick={handleLogout}
            >
              <Link className={s.warningLink} to="/login">
                Close
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
