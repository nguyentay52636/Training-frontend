import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AdminPages from "./modules/Admin/pages/AdminPages";
import LoginPage from "./modules/Auth/pages/LoginPage";

import PointManagement from "./modules/home/components/PointManagement/pages/PointManagement";
import LecturerManager from "./modules/home/components/ManagerLecturer/LecturerManager";
import LessonPlanManager from "./modules/home/components/LessonPlan/LessonPlanManager";
import TrainingProgramManager from "./modules/home/components/TrainingProgram/pages/TrainingProgramManager";
import ManagerDefault from "./modules/home/components/Default/ManagerDefault";
import AccountManagement from "./modules/home/components/AccountManagement/pages/AccountManagement";
import TeachingScheduleManager from "./modules/home/components/ManagerLecturer/ TeachingAssignment/TeachingScheduleManager";
import SkeletonProgramManager from "./modules/home/components/TrainingProgram/pages/SkeletonProgramManager";
import CourseManager from "./modules/home/components/TrainingProgram/components/ProgramContent/components/CourseDetails/CourseManager";

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
        {
          index: true, element: <TrainingProgramManager />,

        },
        { path: "lecturer", element: <LecturerManager /> },
        { path: "point", element: <PointManagement /> },
        { path: "account", element: <AccountManagement /> },
        { path: "lessonplan", element: <LessonPlanManager /> },
        { path: "teachingdivison", element: <TeachingScheduleManager /> },
        {
          path: "trainingprogram/skeletonprogram",
          element: <SkeletonProgramManager />
        },
        // {
        //   path: "trainingprogram",
        //   element: <TrainingProgramManager />,
        // },
        {
          path: "course",
          element: <CourseManager />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;