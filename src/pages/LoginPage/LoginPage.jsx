import { LoginForm } from 'components/LoginForm/LoginForm';
import s from './LoginPage.module.scss';
import logo from '../../images/logo.png';

import { Link, useNavigate } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';

export const LoginPage = ({ isAuth }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/', { replace: true });
  };

  if (isAuth) {
    return <Layout />;
  }

  return (
    <div className={s.logContainer}>
      <div>
        <img className={s.logo} src={logo} alt="" />
      </div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
      <p>
        Don't have an account yet? Then <Link to="/registration">Registr</Link>
      </p>
    </div>
  );
};
