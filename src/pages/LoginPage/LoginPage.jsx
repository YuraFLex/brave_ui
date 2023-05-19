import { LoginForm } from 'components/LoginForm/LoginForm';
import s from './LoginPage.module.scss';
import logo from '../../images/logo.png';


export const LoginPage = () => {
  return (
    <div className={s.logContainer}>
      <div>
        <img className={s.logo} src={logo} alt="" />
      </div>
      <LoginForm />
      <p>
        DashBoard Partners &#169; 2023 
      </p>
    </div>
  );
};
