import { useSelector } from 'react-redux';
import s from './Wraper.module.scss';

export const Wraper = ({ children }) => {
  const isOpen = useSelector(state => state.menuOpen);

  return (
    <div className={`${s.wraper} ${isOpen ? '' : s.menuOpen}`}>{children}</div>
  );
};
