import { LoginForm } from 'components/LoginForm/LoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Flip } from 'react-toastify';

import s from './LoginPage.module.scss';
import logo from '../../images/logo.png';

export const LoginPage = () => {
  const currentDate = new Date();
  const showYear = currentDate.getFullYear();

  return (
    <div className={s.logContainer}>
      <ToastContainer transition={Flip} />
      <div>
        <img className={s.logo} src={logo} alt="" />
      </div>
      <LoginForm />
      <p className={s.copy}>DashBoard Partners &#169; {showYear}</p>
    </div>
  );
};
