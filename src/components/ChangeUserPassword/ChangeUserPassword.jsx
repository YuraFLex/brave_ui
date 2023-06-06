import s from './ChangeUserPassword.module.scss';

export const ChangeUserPassword = () => {
  return (
    <div className={s.ChangeUserPasswordBox}>
      <form className={s.ChangeUserPasswordForm}>
        <label className={s.ChangeUserPasswordLabel}>
          <input
            className={s.ChangeUserPasswordInput}
            type="password"
            placeholder="********"
          />
          <span className={s.ChangeUserPasswordLabelText}>Old Password</span>
        </label>
        <label className={s.ChangeUserPasswordLabel}>
          <input
            className={s.ChangeUserPasswordInput}
            type="password"
            placeholder="********"
          />
          <span className={s.ChangeUserPasswordLabelText}>New Password</span>
        </label>
        <label className={s.ChangeUserPasswordLabel}>
          <input
            className={s.ChangeUserPasswordInput}
            type="password"
            placeholder="********"
          />
          <span className={s.ChangeUserPasswordLabelText}>
            Confirm New Password
          </span>
        </label>
        <button className={s.ChangeUserPasswordSubmitBtn} type="submit">
          Change Password
        </button>
      </form>
    </div>
  );
};
