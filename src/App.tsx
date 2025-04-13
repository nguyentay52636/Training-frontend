import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AdminPages from "./modules/Admin/pages/AdminPages";
import LoginPage from "./modules/Auth/pages/LoginPage";
import PointManagement from "./modules/home/components/PointManagement/pages/PointManagement";
import LecturerManager from "./modules/home/components/ManagerLecturer/LecturerManager";
import LessonPlanManager from "./modules/home/components/LessonPlan/LessonPlanManager";
import TrainingProgramManager from "./modules/home/components/TrainingProgram/pages/TrainingProgramManager";
import AccountManagement from "./modules/home/components/AccountManagement/pages/AccountManagement";
import SkeletonProgramManager from "./modules/home/components/TrainingProgram/pages/SkeletonProgramManager";
import CourseManager from "./modules/home/components/TrainingProgram/components/ProgramContent/components/CourseDetails/CourseManager";
import TeachingScheduleManager from "./modules/home/components/ManagerLecturer/ TeachingAssignment/TeachingScheduleManager";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/trangchu",
      element: <AdminPages />,
      children: [
        {
          index: true,
          element: <TrainingProgramManager />,
        },
        {
          path: "quan-ly-giang-vien",
          element: <LecturerManager />,
          children: [
            { path: "danh-sach-giang-vien", element: <LecturerManager /> },
            { path: "lich-giang-day", element: <TeachingScheduleManager /> },
          ],
        },
        {
          path: "quan-ly-diem",
          element: <PointManagement />,
          children: [
            { path: "xem-diem", element: <PointManagement /> },
          ]

        },
        { path: "quan-ly-tai-khoan", element: <AccountManagement /> },
        { path: "ke-hoach-day-hoc", element: <LessonPlanManager /> },

        {
          path: "chuong-trinh-dao-tao",
          element: <TrainingProgramManager />
        },
        {
          path: "trangchu/chuong-trinh-dao-tao/khung-chuong-trinh/khoahoc",
          element: <CourseManager />,
        },
        {
          path: "chuong-trinh-dao-tao/khung-chuong-trinh", element: <SkeletonProgramManager />
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;