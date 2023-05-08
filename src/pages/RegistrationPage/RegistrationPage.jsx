import { RegistrationForm } from 'components/RegistrationForm/RegistrationForm';
import s from './RegistrationPage.module.scss';
import logo from '../../images/logo.png';

import { Link, useNavigate } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';

export const RegistrationPage = ({ isAuth }) => {
  const navigate = useNavigate();

  const handleRegistrSuccess = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className={s.regContainer}>
      {isAuth ? (
        <>
          <Layout />
        </>
      ) : (
        <>
          <div>
            <img className={s.logo} src={logo} alt="" />
          </div>
          <RegistrationForm onRegSuccess={handleRegistrSuccess} />

          <p>
            Already have an account? <Link to="/">Sign in</Link>
          </p>
        </>
      )}
    </div>
  );
};
