import { Switch, Route } from 'react-router-dom';
// import { Routes } from 'react-router';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Layout } from './Layout/Layout';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { RegistrationPage } from 'pages/RegistrationPage/RegistrationPage';
import { DashBoardPage } from 'pages/DashBoardPage/DashBoardPage';
import { ReportsPage } from 'pages/ReportsPage/ReportsPage';

import { selectIsLoginIn } from 'redux/auth/authSelectors';

export const App = () => {
  const isAuth = useSelector(selectIsLoginIn);
  console.log(isAuth);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchCurrentUser());
  // }, [dispatch]);
  return (
    <>
      {!isAuth ? (
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashBoardPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        </Switch>
      )}
    </>
  );
};
