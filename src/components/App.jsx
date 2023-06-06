import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { DashBoardPage } from 'pages/DashBoardPage/DashBoardPage';
import { ReportsPage } from 'pages/ReportsPage/ReportsPage';

import { PrivateRoute } from 'HOCs/PrivateRoute';
import { PublicRoute } from 'HOCs/PublicRoute';
import { AccessDenied } from 'pages/AccessDenied/AccessDenied';
import { UserPage } from 'pages/UserPage/UserPage';

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
          path="/usersetting"
          element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
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
        <Route
          path="/accessdenied"
          element={
            <PublicRoute>
              <AccessDenied />
            </PublicRoute>
          }
        />
      </Route>
    </Routes>
  );
};
