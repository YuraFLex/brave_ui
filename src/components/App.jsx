import { Routes, Route } from 'react-router';
import { Layout } from './Layout/Layout';
import { DashBoardPage } from 'pages/DashBoardPage/DashBoardPage';
import { ReportsPage } from 'pages/ReportsPage/ReportsPage';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashBoardPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </>
  );
};
