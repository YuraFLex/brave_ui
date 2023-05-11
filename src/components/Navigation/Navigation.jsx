import { Link } from './Navigation.styled';

import { TbReportSearch } from 'react-icons/tb';
import { MdSpaceDashboard } from 'react-icons/md';

import s from './Navigation.module.scss';

export const Navigation = () => {
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
