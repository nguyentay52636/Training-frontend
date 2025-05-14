import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import AddLecturerDialog from './components/AddLecturer/AddLecturerDialog';
import SearchOptionsDropdownMenu from './components/SearchOptionsDropdownMenu';
import LecturerTable from './components/LecturerTable';
import { Button } from '@/components/ui/button';
import { useGetAllTeacherQuery } from './components/query';
import { useState } from 'react';
import PaginationLecture from './components/PaginationLecture';

export default function LecturerManager() {
  const [keyword, setKeyword] = useState('');
  const { data } = useGetAllTeacherQuery();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  return (
    <div>
      {/* Title */}
      <div className='mb-8 '>
        <h1 className='text-4xl font-bold text-blue-900 tracking-tight'>Quản Lý Giảng Viên</h1>
        <p className='text-sm text-gray-500 mt-2'>
          Quản lý thông tin giảng viên của SGU một cách hiệu quả và chuyên nghiệp
        </p>
      </div>

      <div className='flex items-center justify-between py-6 bg-white rounded-xl shadow-sm px-6 mb-6'>
        <div className='relative w-full max-w-md'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
          <Input
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Tìm kiếm giảng viên theo họ tên...'
            className='pl-10 rounded-full border-gray-200 focus:ring-blue-400 shadow-sm'
          />
        </div>

        <div className=' flex gap-x-5'>
          <SearchOptionsDropdownMenu />
          <AddLecturerDialog />
        </div>
      </div>

      {data && <LecturerTable lectureData={data} />}

      <PaginationLecture
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        totalItems={totalItems}
      />
    </div>
  );
}
