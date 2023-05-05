import { Routes, Route } from 'react-router';
import { Layout } from './Layout/Layout';
import { DashBoardPage } from 'pages/DashBoardPage/DashBoardPage';
import { ReportsPage } from 'pages/ReportsPage/ReportsPage';
// import RegistrationForm from './RegisterForm/RegisterForm';
// import LoginForm from './LoginForm/LoginForm';

export const App = () => {
  return (
    <>
      {/* <RegistrationForm /> */}
      {/* <LoginForm /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashBoardPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
      </Routes>
    </>
  );
};
