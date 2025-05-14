import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import AddLecturerDialog from './components/AddLecturer/AddLecturerDialog';
import SearchOptionsDropdownMenu from './components/SearchOptionsDropdownMenu';
import LecturerTable from './components/LecturerTable';
import { useGetAllTeacherQuery } from './components/query';
import { useState } from 'react';
import PaginationLecture from './components/PaginationLecture';
import ExcelActions from './components/ExcelActions/ExcelActions';
import { UserType } from '@/lib/apis/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function LecturerManager() {
  const [keyword, setKeyword] = useState('');
  const { data } = useGetAllTeacherQuery();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [importedData, setImportedData] = useState<UserType[] | null>(null);

  const [selectedColumns, setSelectedColumns] = useState([
    'maGiangVien',
    'tenGiangVien',
    'chucDanh',
    'namPhong',
    'trinhDo',
    'nuoc',
    'namTotNghiep',
  ]);

  const columns = [
    { key: 'maGiangVien', label: 'Mã Giảng Viên' },
    { key: 'tenGiangVien', label: 'Tên Giảng Viên' },
    { key: 'chucDanh', label: 'Chức Danh' },
    { key: 'namPhong', label: 'Năm Phong' },
    { key: 'trinhDo', label: 'Trình Độ' },
    { key: 'nuoc', label: 'Nước' },
    { key: 'namTotNghiep', label: 'Năm Tốt Nghiệp' },
  ];
  const [searchField, setSearchField] = useState('tenGiangVien');

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  const handleImport = (data: UserType[]) => {
    setImportedData(data);
    // TODO: Xử lý thêm nếu muốn cập nhật bảng hoặc gọi API
  };

  // Filter and paginate data
  const getFieldValue = (item: UserType, field: string) => {
    if (field in item) return (item as unknown as Record<string, string>)[field] || '';
    return '';
  };
  const filteredData = data?.filter((item: UserType) => {
    const value = getFieldValue(item, searchField);
    return value.toLowerCase().includes(keyword.toLowerCase());
  }) || [];
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

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
        <div className='flex gap-2 w-full max-w-xl'>
          <Select value={searchField} onValueChange={setSearchField}>
            <SelectTrigger className='w-[180px] rounded-full border-gray-200'>
              <SelectValue>{columns.find(col => col.key === searchField)?.label}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {columns.map(col => (
                <SelectItem key={col.key} value={col.key}>{col.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
            <Input
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={`Tìm kiếm theo ${columns.find(col => col.key === searchField)?.label.toLowerCase()}...`}
              className='pl-10 rounded-full border-gray-200 focus:ring-blue-400 shadow-sm'
            />
          </div>
        </div>

        <div className='flex gap-x-5 '>
          <SearchOptionsDropdownMenu selectedColumns={selectedColumns} onChange={setSelectedColumns} />
          <ExcelActions lectureData={data || []} onImport={handleImport} />
          <AddLecturerDialog />
        </div>
      </div>

      <LecturerTable lectureData={paginatedData} selectedColumns={selectedColumns} />

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
