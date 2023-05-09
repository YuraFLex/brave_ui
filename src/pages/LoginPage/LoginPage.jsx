import { LoginForm } from 'components/LoginForm/LoginForm';
import s from './LoginPage.module.scss';
import logo from '../../images/logo.png';

import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className={s.logContainer}>
      <div>
        <img className={s.logo} src={logo} alt="" />
      </div>
      <LoginForm />
      <p>
        Don't have an account yet? Then <Link to="/registration">Registr</Link>
      </p>
    </div>
  );
};
