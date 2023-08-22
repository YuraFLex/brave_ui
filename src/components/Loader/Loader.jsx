import logo from '../../images/logo.png';

import s from '../Loader/Loader.module.scss';
import './FadingText.css';

export const Loader = () => {
  return (
    <div className={s.bacdrop}>
      <div className={s.ldsSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

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

export const LoaderNew = () => {
  return (
    <div className={s.bacdrop}>
      <div className={s.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export const FadingText = () => {
  return (
    <div id="inTurnFadingTextG" className="inTurnFadingTextG">
      <div id="inTurnFadingTextG_1" className="letter">
        B
      </div>
      <div id="inTurnFadingTextG_2" className="letter">
        R
      </div>
      <div id="inTurnFadingTextG_3" className="letter">
        A
      </div>
      <div id="inTurnFadingTextG_4" className="letter">
        V
      </div>
      <div id="inTurnFadingTextG_5" className="letter">
        E
      </div>
    </div>
  );
};

export const LoaderBrave = () => {
  return (
    <div className="loader-bacdrop">
      <div className="loader">
        <span>BRAVE</span>
        <span>BRAVE</span>
      </div>
    </div>
  );
};

export const BraveLogo = () => {
  return (
    <div className="loader-bacdrop">
      <div className="loader-logo">
        <img className="lader-img" src={logo} alt="logo" />
      </div>
    </div>
  );
};
