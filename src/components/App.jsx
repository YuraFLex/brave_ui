import { Switch, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from './Layout/Layout';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { RegistrationPage } from 'pages/RegistrationPage/RegistrationPage';
import { DashBoardPage } from 'pages/DashBoardPage/DashBoardPage';
import { ReportsPage } from 'pages/ReportsPage/ReportsPage';

import { fetchCurrentUser } from 'redux/auth/authOperations';
import { selectIsFetchingCurrentUser } from 'redux/auth/authSelectors';

export const App = () => {
  const isFetchingCurrentUser = useSelector(selectIsFetchingCurrentUser);
  console.log(isFetchingCurrentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  return (
    <>
      {!isFetchingCurrentUser ? (
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/registration" component={RegistrationPage} />
        </Switch>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashBoardPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        </Routes>
      )}
    </>
  );
};
