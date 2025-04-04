import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import { MainLayout } from '@/components/layouts';
import AdminPages from './modules/Admin/pages/AdminPages';
import ManagerPointPage from './modules/Admin/pages/ManagerPointPage';
import ManagerAccountPage from './modules/Admin/pages/ManagerAccountPage';
import { LoginForm } from './modules/Auth/components';

function App() {
  const router = createBrowserRouter([
    // Main layout

    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <LoginForm />,
        },
      ],
    },

    {
      path: '/admin',
      element: <AdminPages />, // yeu cau dang nahp
      children: [
        {
          path: 'point',
          element: <ManagerPointPage />,
        },
        {
          path: 'account',
          element: <ManagerAccountPage />,
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
