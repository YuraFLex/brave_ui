import { LoginForm } from 'components/LoginForm/LoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './LoginPage.module.scss';
import logo from '../../images/logo.png';

export const LoginPage = () => {
  return (
    <div className={s.logContainer}>
      <div>
        <img className={s.logo} src={logo} alt="" />
      </div>
      <LoginForm />
      <ToastContainer />
      <p className={s.copy}>DashBoard Partners &#169; 2023</p>
    </div>
  );
};
