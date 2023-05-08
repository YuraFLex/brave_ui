import { useState } from 'react';
import { Button } from 'components/Button/Button';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/authOperations';
import { useNavigate } from 'react-router-dom';

import s from './LoginForm.module.scss';

export const LoginForm = ({ isAuth, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
    onLoginSuccess && onLoginSuccess();
    navigate('/');
  };

  if (isAuth) {
    navigate('/', { replace: true });
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className={s.logForm}>
      <label className={s.logLabel}>
        Email:
        <input
          className={s.logInput}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label className={s.logLabel}>
        Password:
        <input
          className={s.logInput}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <Button type="submit" text="Login" />
    </form>
  );
};
