import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/authOperations';
import { LoaderBtn } from '../Loader/Loader';
import { authIsLoading } from '../../redux/auth/authSelectors';

import Button from '@mui/material/Button';

import s from './LoginForm.module.scss';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(authIsLoading);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));

    setEmail('');
    setPassword('');
  };

  if (isLoading) {
    return <LoaderBtn />;
  }

  return (
    <form onSubmit={handleSubmit} className={s.logForm}>
      <h2 className={s.logTitle}>Welcome</h2>
      <h3 className={s.logSubTitile}>
        Please enter your email and password to continue
      </h3>
      <label className={s.logLabel}>
        <input
          className={s.logInput}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="example@mail.com"
        />
        <span className={s.logLabelText}>Email:</span>
      </label>
      <label className={s.logLabel}>
        <input
          className={s.logInput}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <span className={s.logLabelText}>Password:</span>
      </label>
      <Button
        variant="contained"
        style={{ backgroundColor: '#0099fa' }}
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};
