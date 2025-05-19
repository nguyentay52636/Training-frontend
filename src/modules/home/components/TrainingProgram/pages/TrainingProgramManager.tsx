import { Plus, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trainingPrograms } from '../components/DataThongTinChung';
import { useGetAllStudySectionQuery } from '../components/querys';
import PaginationTraningProgram from '../components/ProgramContent/components/CourseDetails/components/PaginationTraningProgram';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import FilterAndSearch from '../components/FilterAndSearch';
import { PropramData, ThongTinChung } from '@/lib/apis/types';

export default function TrainingProgramManager() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'id',
    'tenChuongTrinh',
    'bac',
    'loaiBang',
    'loaiHinhDaoTao',
    'thoiGian',
    'soTinChi',
    'khoaQuanLy',
    'ngonNgu',
    'khoaTuyen',
    'actions',
  ]);

  const { data: queryData } = useGetAllStudySectionQuery();

  // Xử lý tìm kiếm
  const filteredData = useMemo(() => {
    if (!queryData) return [];

    if (!searchKeyword.trim()) return queryData;

    return queryData.filter((thongtin: PropramData) =>
      thongtin.thongTinChung.some((program: ThongTinChung) => {
        // Tìm kiếm trong tất cả các trường
        return Object.values(program).some((value) =>
          value?.toString().toLowerCase().includes(searchKeyword.toLowerCase()),
        );
      }),
    );
  }, [queryData, searchKeyword]);

  const totalPages = Math.ceil((filteredData?.length || 0) / rowsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

  const handleColumnToggle = (columns: string[]) => {
    setVisibleColumns(columns);
  };

  const handleRefresh = () => {
    setSearchKeyword('');
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

        <FilterAndSearch
          onSearch={handleSearch}
          onColumnToggle={handleColumnToggle}
          onRefresh={handleRefresh}
        />

        <Card className='border-gray-200'>
          <CardContent className='p-6'>
            {filteredData.length > 0 ? (
              <div className='rounded-md border border-gray-200'>
                <Table>
                  <TableHeader>
                    <TableRow className='bg-blue-600 hover:bg-blue-600'>
                      {visibleColumns.includes('id') && (
                        <TableHead className='text-white'>ID</TableHead>
                      )}
                      {visibleColumns.includes('tenChuongTrinh') && (
                        <TableHead className='text-white'>Tên chương trình</TableHead>
                      )}
                      {visibleColumns.includes('bac') && (
                        <TableHead className='text-white'>Bậc</TableHead>
                      )}
                      {visibleColumns.includes('loaiBang') && (
                        <TableHead className='text-white'>Loại bằng</TableHead>
                      )}
                      {visibleColumns.includes('loaiHinhDaoTao') && (
                        <TableHead className='text-white'>Loại hình đào tạo</TableHead>
                      )}
                      {visibleColumns.includes('thoiGian') && (
                        <TableHead className='text-white'>Thời gian</TableHead>
                      )}
                      {visibleColumns.includes('soTinChi') && (
                        <TableHead className='text-white'>Số tín chỉ</TableHead>
                      )}
                      {visibleColumns.includes('khoaQuanLy') && (
                        <TableHead className='text-white'>Khoa quản lý</TableHead>
                      )}
                      {visibleColumns.includes('ngonNgu') && (
                        <TableHead className='text-white'>Ngôn ngữ</TableHead>
                      )}
                      {visibleColumns.includes('khoaTuyen') && (
                        <TableHead className='text-white'>Khóa tuyển</TableHead>
                      )}
                      {visibleColumns.includes('actions') && (
                        <TableHead className='text-white'>Hành động</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((thongtin: PropramData) =>
                      thongtin.thongTinChung.map((program: ThongTinChung) => (
                        <TableRow key={program.id} className='hover:bg-gray-50'>
                          {visibleColumns.includes('id') && <TableCell>{program.id}</TableCell>}
                          {visibleColumns.includes('tenChuongTrinh') && (
                            <TableCell>{program.tenChuongTrinh}</TableCell>
                          )}
                          {visibleColumns.includes('bac') && <TableCell>{program.bac}</TableCell>}
                          {visibleColumns.includes('loaiBang') && (
                            <TableCell>{program.loaiBang}</TableCell>
                          )}
                          {visibleColumns.includes('loaiHinhDaoTao') && (
                            <TableCell>{program.loaiHinhDaoTao}</TableCell>
                          )}
                          {visibleColumns.includes('thoiGian') && (
                            <TableCell>{program.thoiGian}</TableCell>
                          )}
                          {visibleColumns.includes('soTinChi') && (
                            <TableCell>{program.soTinChi}</TableCell>
                          )}
                          {visibleColumns.includes('khoaQuanLy') && (
                            <TableCell>{program.khoaQuanLy}</TableCell>
                          )}
                          {visibleColumns.includes('ngonNgu') && (
                            <TableCell>{program.ngonNgu}</TableCell>
                          )}
                          {visibleColumns.includes('khoaTuyen') && (
                            <TableCell>{program.khoaTuyen}</TableCell>
                          )}
                          {visibleColumns.includes('actions') && (
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
                          )}
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
