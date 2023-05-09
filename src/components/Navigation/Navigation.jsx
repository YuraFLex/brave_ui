import { Link } from './Navigation.styled';
// import { useSelector } from 'react-redux';
// import { selectIsLoginIn } from 'redux/auth/authSelectors';

import s from './Navigation.module.scss';
import { TbReportSearch } from 'react-icons/tb';
import { MdSpaceDashboard } from 'react-icons/md';

export const Navigation = () => {
  // const isAuath = useSelector(selectIsLoginIn)
  return (
    <nav className={s.nav}>
      {/* <div className={s.menuBurger}>
        <button className={s.menuBtn}>
          <RxHamburgerMenu className={s.menuIcon} />
        </button>
      </div> */}
      <ul className={s.navlist}>
        <li>
          <Link to="/" end>
            <span>
              <MdSpaceDashboard className={s.icon} />
            </span>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="reports">
            <span>
              <TbReportSearch className={s.icon} />
            </span>
            Reports
          </Link>
        </li>
      </ul>
    </nav>
  );
};
