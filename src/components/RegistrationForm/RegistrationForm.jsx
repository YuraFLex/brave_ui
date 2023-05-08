import { Button } from 'components/Button/Button';
import { useState } from 'react';
// import axios from 'axios';

import { useDispatch } from 'react-redux';
import { registration } from '../../redux/auth/authOperations';

import s from './RegisterForm.module.scss';

export const RegistrationForm = () => {
  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registration({ email, password }));

    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.regForm}>
      {/* <label className={s.regLabel}>
        Name:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label> */}
      <label className={s.regLabel}>
        Email:
        <input
          className={s.regInput}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label className={s.regLabel}>
        Password:
        <input
          className={s.regInput}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>

      <Button type="submit" text="Register" />
    </form>
  );
};
