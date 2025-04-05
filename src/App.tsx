import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { MainLayout } from '@/components/layouts';
import AdminPages from './modules/Admin/pages/AdminPages';
import ManagerPointPage from './modules/Admin/pages/ManagerPointPage';
import ManagerAccountPage from './modules/Admin/pages/ManagerAccountPage';
import LoginPage from './modules/Auth/pages/LoginPage';
import { AccountManagement } from './modules/Auth/components/AccountManagement';

function App() {
  const router = createBrowserRouter([
    // Main layout

    {
      path: '/',
      element: <LoginPage />,
      children: [
        {
          index: true,
          element: <MainLayout />,
        },
      ],


    },
    {
      path: '/dashboard',
      element: <AdminPages />

    },
    {
      path: '/admin',
      element: <AdminPages />,
      children: [
        {
          path: 'point',
          element: <ManagerPointPage />,
        },
        {
          path: 'account',
          element: <AccountManagement />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
