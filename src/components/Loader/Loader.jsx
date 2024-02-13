import logo from '../../images/logo.png';
import s from '../Loader/Loader.module.scss';

export const LoaderBtn = () => {
  return (
    <div className={s.ldsellipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export const BraveLogo = ({ message }) => {
  return (
    <div className={s.loaderBacdrop}>
      <div className={s.loaderLogo}>
        <img className={s.laderImg} src={logo} alt="logo" />
        <span
          style={{
            color: '#94979c',
            position: 'fixed',
            bottom: '30px',
            fontSize: '14px',
          }}
        >
          {message}
        </span>
      </div>
    </div>
  );
};
