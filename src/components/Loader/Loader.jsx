import s from '../Loader/Loader.module.scss';

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

export const Spiner = () => {
  return (
    <div className={s.bacdrop}>
      <div className={s.ldsRipple}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
