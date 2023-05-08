import { useState } from 'react';
import { Button } from 'components/Button/Button';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/authOperations';
// import axios from 'axios';

import s from './LoginForm.module.scss';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  // const handleSubmit = async e => {
  //   e.preventDefault();
  // try {
  //   const response = await axios.post('/api/login', { email, password });
  //   const token = response.data.token;
  //   localStorage.setItem('token', token);

  //   window.location.reload();
  // } catch (error) {
  //   console.error(error);
  // }
  // };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setEmail('');
    setPassword('');
  };

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
