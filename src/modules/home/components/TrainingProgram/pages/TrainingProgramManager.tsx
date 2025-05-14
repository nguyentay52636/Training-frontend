import { Search, Filter, RefreshCw, Plus, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trainingPrograms } from '../components/DataThongTinChung';
import { useGetAllStudySectionQuery } from '../components/querys';
import PaginationTraningProgram from '../components/ProgramContent/components/CourseDetails/components/PaginationTraningProgram';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Định nghĩa các trường tìm kiếm
const searchFields = [
  { value: 'tenChuongTrinh', label: 'Tên chương trình' },
  { value: 'bac', label: 'Bậc' },
  { value: 'loaiBang', label: 'Loại bằng' },
  { value: 'loaiHinhDaoTao', label: 'Loại hình đào tạo' },
  { value: 'khoaQuanLy', label: 'Khoa quản lý' },
  { value: 'ngonNgu', label: 'Ngôn ngữ' },
  { value: 'khoaTuyen', label: 'Khóa tuyển' },
];

export default function TrainingProgramManager() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedField, setSelectedField] = useState('tenChuongTrinh');

  const { data: queryData } = useGetAllStudySectionQuery();

  // Xử lý tìm kiếm
  const filteredData = useMemo(() => {
    if (!queryData) return [];

    if (!searchKeyword.trim()) return queryData;

    return queryData.filter((thongtin) =>
      thongtin.thongTinChung.some((program) => {
        const searchValue = program[selectedField]?.toString().toLowerCase() || '';
        return searchValue.includes(searchKeyword.toLowerCase());
      })
    );
  }, [queryData, searchKeyword, selectedField]);

  const totalPages = Math.ceil((filteredData?.length || 0) / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };

  const handleFieldChange = (value: string) => {
    setSelectedField(value);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi trường tìm kiếm
  };

  const handleRefresh = () => {
    setSearchKeyword('');
    setSelectedField('tenChuongTrinh');
    setCurrentPage(1);
  };

  return (
    queryData && (
      <div className='min-h-screen bg-white p-6'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold text-gray-800'>Chương trình đào tạo</h1>
          <Button
            onClick={() => navigate('/trangchu/chuong-trinh-dao-tao/khung-chuong-trinh/')}
            className='bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
          >
            <Plus className='w-5 h-5 mr-2' />
            Tạo chương trình đào tạo
          </Button>
        </div>

        <Card className='mb-6 border-gray-200'>
          <CardContent className='p-4'>
            <div className='flex items-center gap-4'>
              {/* Dropdown chọn trường tìm kiếm */}
              <Select value={selectedField} onValueChange={handleFieldChange}>
                <SelectTrigger className='w-[180px] border-gray-300 focus:border-blue-600 focus:ring-blue-600'>
                  <SelectValue placeholder='Chọn trường tìm kiếm' />
                </SelectTrigger>
                <SelectContent>
                  {searchFields.map((field) => (
                    <SelectItem key={field.value} value={field.value}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Ô tìm kiếm */}
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                <Input
                  type='text'
                  placeholder={`Tìm kiếm theo ${searchFields.find(f => f.value === selectedField)?.label.toLowerCase()}`}
                  value={searchKeyword}
                  onChange={(e) => handleSearch(e.target.value)}
                  className='pl-10 border-gray-300 focus:border-blue-600 focus:ring-blue-600'
                />
              </div>

              <Button
                variant='outline'
                className='gap-2 border-gray-300 hover:bg-gray-100 hover:text-gray-900'
                onClick={handleRefresh}
              >
                <RefreshCw className='w-5 h-5' />
                Làm mới
              </Button>

              <Button className='gap-2 bg-blue-600 hover:bg-blue-700 text-white'>
                <Filter className='w-5 h-5' />
                Lọc
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className='border-gray-200'>
          <CardContent className='p-6'>
            {filteredData.length > 0 ? (
              <div className='rounded-md border border-gray-200'>
                <Table>
                  <TableHeader>
                    <TableRow className='bg-blue-600 hover:bg-blue-600'>
                      <TableHead className='text-white'>ID</TableHead>
                      <TableHead className='text-white'>Tên chương trình</TableHead>
                      <TableHead className='text-white'>Bậc</TableHead>
                      <TableHead className='text-white'>Loại bằng</TableHead>
                      <TableHead className='text-white'>Loại hình đào tạo</TableHead>
                      <TableHead className='text-white'>Thời gian</TableHead>
                      <TableHead className='text-white'>Số tín chỉ</TableHead>
                      <TableHead className='text-white'>Khoa quản lý</TableHead>
                      <TableHead className='text-white'>Ngôn ngữ</TableHead>
                      <TableHead className='text-white'>Khóa tuyển</TableHead>
                      <TableHead className='text-white'>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((thongtin) =>
                      thongtin.thongTinChung.map((program) => (
                        <TableRow key={program.id} className='hover:bg-gray-50'>
                          <TableCell>{program.id}</TableCell>
                          <TableCell>{program.tenChuongTrinh}</TableCell>
                          <TableCell>{program.bac}</TableCell>
                          <TableCell>{program.loaiBang}</TableCell>
                          <TableCell>{program.loaiHinhDaoTao}</TableCell>
                          <TableCell>{program.thoiGian}</TableCell>
                          <TableCell>{program.soTinChi}</TableCell>
                          <TableCell>{program.khoaQuanLy}</TableCell>
                          <TableCell>{program.ngonNgu}</TableCell>
                          <TableCell>{program.khoaTuyen}</TableCell>
                          <TableCell>
                            <Button
                              variant='outline'
                              size='sm'
                              className='gap-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                            >
                              <Edit className='w-4 h-4' />
                              Xem chi tiết
                            </Button>
                          </TableCell>
                        </TableRow>
                      )),
                    )}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className='text-center py-10'>
                <p className='text-gray-500'>Không có chương trình đào tạo nào để hiển thị</p>
              </div>
            )}
          </CardContent>
        </Card>

        <PaginationTraningProgram
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          totalItems={filteredData?.length || 0}
        />
      </div>
    )
  );
}
