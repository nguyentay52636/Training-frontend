import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import SearchOptionsDropdownMenu from '../ManagerLecturer/components/SearchOptionsDropdownMenu';
import TablePlanGroup from './components/TablePlanGroup';
import DialogAddPlanGroup from './components/AddPlanGroup/DialogAddPlanGroup';
import { KeHoachMoNhomType } from '@/lib/apis/types';
import { getAllKeHoachMoNhom, deleteKeHoachMoNhom } from '@/lib/apis/keHoachMoNhomApi';

export default function ManagerPlanGroup() {
  const [data, setData] = useState<KeHoachMoNhomType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAllKeHoachMoNhom();
      setData(response);
    } catch (err) {
      console.error('Error fetching data:', err);
      toast.error('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteKeHoachMoNhom(id);
      toast.success('Xóa thành công');
      fetchData();
    } catch (err) {
      console.error('Error deleting:', err);
      toast.error('Có lỗi xảy ra khi xóa');
    }
  };

  const handleEdit = (data: KeHoachMoNhomType) => {
    // Handle edit logic here
    console.log('Edit:', data);
  };

  const filteredData = data.filter(item => 
    item.namHoc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Title */}
      <div className='mb-8 '>
        <h1 className='text-4xl font-bold text-blue-900 tracking-tight'>Kế hoạch mở nhóm</h1>
        <p className='text-sm text-gray-500 mt-2'>Quản lý thông tin kế hoạch mở nhóm học</p>
      </div>

      <div className='flex items-center justify-between py-6 bg-white rounded-xl shadow-sm px-6 mb-6'>
        <div className='relative w-full max-w-md'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
          <Input
            placeholder='Tìm kiếm theo năm học...'
            className='pl-10 rounded-full border-gray-200 focus:ring-blue-400 shadow-sm'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='flex gap-x-5'>
          <SearchOptionsDropdownMenu />
          <DialogAddPlanGroup onSuccess={fetchData} />
        </div>
      </div>

      <TablePlanGroup
        data={filteredData}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
