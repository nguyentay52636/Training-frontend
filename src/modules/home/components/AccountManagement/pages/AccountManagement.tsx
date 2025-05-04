import { useState } from 'react';
import { useGetAllUserQuery } from '../components/querys';
import TableAccount from '../components/TableAccount';
import FilterAndActionsAccount from '../components/FilterAndActionsAccount';
import PaginationAcount from '../components/PaginationAcount';

export default function AccountManagement() {
  const [searchKeyword, setSearchKeyword] = useState('b');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sử dụng react-query để fetch data
  const { data: userData, isLoading, isError } = useGetAllUserQuery({ keyword: searchKeyword });

  if (!userData) return;

  // Tính toán phân trang
  const totalPages = Math.ceil(userData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = userData.slice(startIndex, endIndex);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className='w-full p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen'>
      {/* Tiêu đề */}
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-4xl font-bold text-blue-900 tracking-tight'>Quản Lý tài khoản</h1>
          <p className='text-sm text-gray-500 mt-2'>
            Quản lý thông tin tài khoản của SGU một cách hiệu quả và chuyên nghiệp
          </p>
        </div>
      </div>

      <FilterAndActionsAccount setSearchKeyword={setSearchKeyword} searchKeyword={searchKeyword} />

      <TableAccount data={currentData} />

      <PaginationAcount
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
