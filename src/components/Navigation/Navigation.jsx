import { Link } from './Navigation.styled';
import s from './Navigation.module.scss';
// import { AiFillHome } from 'react-icons/ai';
import { TbReportSearch } from 'react-icons/tb';
import { MdSpaceDashboard } from 'react-icons/md';

export const Navigation = () => {
  return (
    <nav>
      <ul className={s.navlist}>
        <li>
          <Link to="/" end>
            <span>
              {/* <AiFillHome /> */}
              <MdSpaceDashboard className={s.icon} />
            </span>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="partner">
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
