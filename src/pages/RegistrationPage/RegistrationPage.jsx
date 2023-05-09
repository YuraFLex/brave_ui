import { RegistrationForm } from 'components/RegistrationForm/RegistrationForm';
import s from './RegistrationPage.module.scss';
import logo from '../../images/logo.png';

import { Link } from 'react-router-dom';

export const RegistrationPage = () => {
  return (
    <div className={s.regContainer}>
      <>
        <div>
          <img className={s.logo} src={logo} alt="" />
        </div>
        <RegistrationForm />

        <p>
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </>
    </div>
  );
};
