import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/authOperations';
import { LoaderBtn } from 'components/Loader/Loader';
import { selectIsLoading } from 'redux/auth/authSelectors';

import { Button } from 'components/Button/Button';

import s from './LoginForm.module.scss';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));

    setEmail('');
    setPassword('');
  };

  return (
    <>
      {isLoading ? (
        <LoaderBtn />
      ) : (
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
      )}
    </>
  );
};
