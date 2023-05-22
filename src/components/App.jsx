import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { DashBoardPage } from 'pages/DashBoardPage/DashBoardPage';
import { ReportsPage } from 'pages/ReportsPage/ReportsPage';

import { PrivateRoute } from 'HOCs/PrivateRoute';
import { PublicRoute } from 'HOCs/PublicRoute';
import { HomePage } from 'pages/HomePage/HomePage';

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
          path="/login"
          element={
            <PublicRoute restricted>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/check"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
      </Route>
    </Routes>
  );
};
