import s from './Wraper.module.scss';

export const Wraper = ({ children }) => {
  return <div className={s.wraper}>{children}</div>;
};
