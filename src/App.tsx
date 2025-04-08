import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AdminPages from "./modules/Admin/pages/AdminPages";
import LoginPage from "./modules/Auth/pages/LoginPage";

import PointManagement from "./modules/home/components/PointManagement/PointManagement";
import LecturerManager from "./modules/home/components/ManagerLecturer/LecturerManager";
import LessonPlanManager from "./modules/home/components/LessonPlan/LessonPlanManager";
import TrainingProgramManager from "./modules/home/components/TrainingProgram/TrainingProgramManager";
import ManagerDefault from "./modules/home/components/Default/ManagerDefault";
import AccountManagement from "./modules/home/components/AccountManagement/pages/AccountManagement";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <AdminPages />,
      children: [
        { index: true, element: <ManagerDefault /> },
        { path: "lecturer", element: <LecturerManager /> },
        { path: "point", element: <PointManagement /> },
        { path: "account", element: <AccountManagement /> },
        { path: "lessonplan", element: <LessonPlanManager /> },
        { path: "trainingprogram", element: <TrainingProgramManager /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;