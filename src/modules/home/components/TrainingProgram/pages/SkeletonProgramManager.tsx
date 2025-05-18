import { Tabs } from '@/components/ui/tabs';
import Header from '../components/TabsThongTinChung/Header';
import TabNavigation from '../components/TabsThongTinChung/TabNavigation';
import ThongTinChung from '../components/TabsThongTinChung/ThongTinChung';
import MucTieuDaoTao from '../components/TabsThongTinChung/MucTieuDaoTao';
import NoiDungChuongTrinh from '../components/TabsThongTinChung/NoiDungChuongTrinh';
import KeHoachDayHoc from '../components/TabsThongTinChung/KeHoachDayHoc';

export default function SkeletonProgramManager() {
  return (
    <div className='p-6 bg-white text-gray-800'>
      <Header />
      <div className='bg-white p-6 rounded-xl shadow-lg'>
        <Tabs defaultValue='general' className='w-full'>
          <TabNavigation />
          <ThongTinChung />
          <MucTieuDaoTao />
          <NoiDungChuongTrinh />
          <KeHoachDayHoc />
        </Tabs>
      </div>
    </div>
  );
}
