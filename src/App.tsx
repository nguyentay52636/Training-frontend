import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AdminPages from './modules/Admin/pages/AdminPages';
import LoginPage from './modules/Auth/pages/LoginPage';
import PointManagement from './modules/home/components/PointManagement/pages/PointManagement';
import LecturerManager from './modules/home/components/ManagerLecturer/LecturerManager';
import LessonPlanManager from './modules/home/components/LessonPlan/LessonPlanManager';
import TrainingProgramManager from './modules/home/components/TrainingProgram/pages/TrainingProgramManager';
import AccountManagement from './modules/home/components/AccountManagement/pages/AccountManagement';
import SkeletonProgramManager from './modules/home/components/TrainingProgram/pages/SkeletonProgramManager';
import CourseManager from './modules/home/components/TrainingProgram/components/ProgramContent/components/CourseDetails/CourseManager';
import TeachingScheduleManager from './modules/home/components/ManagerLecturer/ TeachingAssignment/TeachingScheduleManager';
import NotFound from './modules/home/pages/NotFound';
import { LecturerEditProfile } from './modules/Auth/pages/EditProfile';
import ManagerPlanGroup from './modules/home/components/PlanGroup/ManagerPlanGroup';
import ManagerLectureSkeleton from './modules/home/components/SkeletonLecture/ManagerLectureSkeleton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManagerCourseDetail from './modules/home/components/ManagerKnowAndBlock/components/ManagerCourseDetail/ManagerCourseDetail';
import ManagerBlockKnowledge from './modules/home/components/ManagerKnowAndBlock/components/ManagerBlockKnowledge/ManagerBlockKnowledge';
import ManagerKnowledge from './modules/home/components/ManagerKnowAndBlock/components/ManagerKnowledge/ManagerKnowledge';
import DashBoardManager from './modules/home/components/Dashboard/DashBoardManager';
import MucTieuDaoTao from './modules/home/components/MucTieuDaoTao/MucTieuDaoTao';
import AuthGuard from './guard/AuthGuard';
import ManagerMajor from './modules/home/components/ManagerMajor/ManagerMajor';
import ManagerThongTinChung from './modules/home/components/ManagerThongTinChung/ManagerThongTinChung';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/trangchu',
      element: (
        <AuthGuard>
          <AdminPages />
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: <TrainingProgramManager />,
        },
        {
          path: 'quan-ly-giang-vien',
          element: <ManagerLectureSkeleton />,
          children: [
            { path: 'danh-sach-giang-vien', element: <LecturerManager /> },
            { path: 'lich-giang-day', element: <TeachingScheduleManager /> },
            {
              path: 'ke-hoach-mo-nhom',
              element: <ManagerPlanGroup />,
            },
          ],
        },
        {
          path: 'tai-lieu',
          children: [
            { path: 'de-cuong-chi-tiet', element: <MucTieuDaoTao /> },
            { path: 'thong-tin-chung', element: <ManagerThongTinChung /> },
          ],
        },
        {
          path: 'quan-ly-khoi',
          children: [
            { path: 'khoikienthuc', element: <ManagerBlockKnowledge /> },
            { path: 'hocphan', element: <ManagerCourseDetail /> },
            {
              path: 'kienthuc',
              element: <ManagerKnowledge />,
            },
          ],
        },
        {
          path: 'quan-ly-chuyen-nganh',
          element: <ManagerMajor />,
        },
        {
          path: 'quan-ly-diem',

          children: [
            { path: 'thong-ke-diem', element: <DashBoardManager /> },
            { path: 'xem-diem', element: <PointManagement /> },
          ],
        },
        { path: 'quan-ly-tai-khoan', element: <AccountManagement /> },
        { path: 'ke-hoach-day-hoc', element: <LessonPlanManager /> },

        {
          path: 'chuong-trinh-dao-tao',
          element: <TrainingProgramManager />,
        },
        {
          path: 'lich-giang-day',
          element: <CourseManager />,
        },
        {
          path: 'cai-dat/tai-khoan',
          element: <LecturerEditProfile />,
        },

        {
          path: 'chuong-trinh-dao-tao/khung-chuong-trinh',
          element: <SkeletonProgramManager />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
}

export default App;
