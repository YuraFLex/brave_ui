import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Layout } from './Layout/Layout';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { RegistrationPage } from 'pages/RegistrationPage/RegistrationPage';
import { DashBoardPage } from 'pages/DashBoardPage/DashBoardPage';
import { ReportsPage } from 'pages/ReportsPage/ReportsPage';

import { selectIsLoginIn } from 'redux/auth/authSelectors';

export const App = () => {
  const isAuth = useSelector(selectIsLoginIn);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage isAuth={isAuth} />} />
      <Route
        path="/registration"
        element={<RegistrationPage isAuth={isAuth} />}
      />
      <Route
        path="/"
        element={
          isAuth ? (
            <Layout>
              <Route index element={<DashBoardPage />} />
              <Route path="reports" element={<ReportsPage />} />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};
