import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout/Layout';
// import { HomePage } from 'pages/HomePage/HomePage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { RegistrationPage } from 'pages/RegistrationPage/RegistrationPage';
import { DashBoardPage } from 'pages/DashBoardPage/DashBoardPage';
import { ReportsPage } from 'pages/ReportsPage/ReportsPage';

import { PrivateRoute } from 'HOCs/PrivateRoute';
import { PublicRoute } from 'HOCs/PublicRoute';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <DashBoardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <ReportsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <PublicRoute restricted>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute restricted>
              <LoginPage />
            </PublicRoute>
          }
        />
      </Route>
    </Routes>
  );
};
