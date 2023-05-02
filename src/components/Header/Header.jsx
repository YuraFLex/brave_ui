import s from './Header.module.scss';

export const Header = () => {
  return (
    <>
      <header className={s.header}>
        <h1>Brave</h1>
        <div className={s.headerMenu}>
          <ul className={s.menuList}>
            <li>
              <span>Incoming QPS:</span>
              <span> 1</span>
            </li>
            <li>
              <span>Outgoing QPS:</span>
              <span> 2</span>
            </li>
            <li>
              <span>Net profit:</span>
              <span> 3</span>
            </li>
          </ul>

          <span className={s.user}>User name</span>
          <button className={s.logoutBtn}>Log out</button>
        </div>
      </header>
    </>
  );
};
