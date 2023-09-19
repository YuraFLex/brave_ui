import { Link } from 'react-router-dom';
import s from './ErrorPage.module.scss';
import { Wraper } from 'components/Wraper/Wraper';
import Button from '@mui/material/Button';

export const ErrorPage = () => {
  return (
    <div className={s.s}>
      <Wraper>
        <div className={s.container}>
          <div className={s.error} title="404">
            404
          </div>

          <div className={s.errorMessage}>
            <h3>Ouch! Page not found!</h3>
            <h5>Unfortunately we can't find the requested page.</h5>
            <h5>You may have entered the address incorrectly.</h5>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#0099fa',
                width: '350px',
                margin: '0 auto',
              }}
            >
              <Link className={s.link} to="/">
                Return Home Page
              </Link>
            </Button>
          </div>
        </div>
      </Wraper>
    </div>
  );
};
