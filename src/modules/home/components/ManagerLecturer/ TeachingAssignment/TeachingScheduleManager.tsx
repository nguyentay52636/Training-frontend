import { Input } from '@/components/ui/input';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import TableTeachingSchedule from './components/TableTeachingSchedule';
import DialogAddTeachingSchedule from './components/AddTeachingSchedule/DialogAddTeachingSchedule';
import PaginationTeachingSchedule from './components/PaginationTeachingSchedule';
import { useGetAllPhanCongGiangDayQuery } from './components/AddTeachingSchedule/querys';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TeachingScheduleManager() {
  const { data } = useGetAllPhanCongGiangDayQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    maGiangVien: '',
    chucDanh: '',
    tenMonHoc: '',
    soTietThucHien: '',
    soTietThucTe: '',
  });

  // Filter data based on search term and advanced filters
  const filteredData = data?.filter((item) => {
    const matchesBasicSearch = 
      item.giangVien.tenGiangVien.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.giangVien.maGiangVien.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAdvancedFilters = 
      (!advancedFilters.maGiangVien || item.giangVien.maGiangVien.includes(advancedFilters.maGiangVien)) &&
      (!advancedFilters.chucDanh || item.giangVien.chucDanh.includes(advancedFilters.chucDanh)) &&
      (!advancedFilters.tenMonHoc || item.tenMonHoc.includes(advancedFilters.tenMonHoc)) &&
      (!advancedFilters.soTietThucHien || item.soTietThucHien.toString().includes(advancedFilters.soTietThucHien)) &&
      (!advancedFilters.soTietThucTe || item.soTietThucTe.toString().includes(advancedFilters.soTietThucTe));

    return matchesBasicSearch && matchesAdvancedFilters;
  });

  const handleAdvancedSearch = () => {
    setShowAdvancedSearch(false);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setAdvancedFilters({
      maGiangVien: '',
      chucDanh: '',
      tenMonHoc: '',
      soTietThucHien: '',
      soTietThucTe: '',
    });
  };

  const activeFiltersCount = Object.values(advancedFilters).filter(value => value !== '').length;

  return (
    data && (
      <div>
        {/* Title */}
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-blue-900 tracking-tight'>Lịch giảng dạy</h1>
          <p className='text-sm text-gray-500 mt-2'>
            Quản lý thông tin giảng viên của SGU một cách hiệu quả và chuyên nghiệp
          </p>
        </div>

        <div className='flex flex-col gap-4 py-6 bg-white rounded-xl shadow-sm px-6 mb-6'>
          {/* Search Bar */}
          <div className='flex items-center gap-4'>
            <div className='relative flex-1 max-w-md'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
              <Input
                placeholder='Tìm kiếm giảng viên theo họ tên hoặc mã...'
                className='pl-10 rounded-full border-gray-200 focus:ring-blue-400 shadow-sm'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Dialog open={showAdvancedSearch} onOpenChange={setShowAdvancedSearch}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Tìm kiếm nâng cao
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Tìm kiếm nâng cao</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="maGiangVien" className="text-right">
                        Mã giảng viên
                      </Label>
                      <Input
                        id="maGiangVien"
                        value={advancedFilters.maGiangVien}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, maGiangVien: e.target.value})}
                        className="col-span-3"
                        placeholder="Nhập mã giảng viên..."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="chucDanh" className="text-right">
                        Chức danh
                      </Label>
                      <Input
                        id="chucDanh"
                        value={advancedFilters.chucDanh}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, chucDanh: e.target.value})}
                        className="col-span-3"
                        placeholder="Nhập chức danh..."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="tenMonHoc" className="text-right">
                        Tên môn học
                      </Label>
                      <Input
                        id="tenMonHoc"
                        value={advancedFilters.tenMonHoc}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, tenMonHoc: e.target.value})}
                        className="col-span-3"
                        placeholder="Nhập tên môn học..."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="soTietThucHien" className="text-right">
                        Số tiết thực hiện
                      </Label>
                      <Input
                        id="soTietThucHien"
                        type="number"
                        value={advancedFilters.soTietThucHien}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, soTietThucHien: e.target.value})}
                        className="col-span-3"
                        placeholder="Nhập số tiết..."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="soTietThucTe" className="text-right">
                        Số tiết thực tế
                      </Label>
                      <Input
                        id="soTietThucTe"
                        type="number"
                        value={advancedFilters.soTietThucTe}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, soTietThucTe: e.target.value})}
                        className="col-span-3"
                        placeholder="Nhập số tiết..."
                      />
                    </div>
                  </div>
                </ScrollArea>
                <div className="flex justify-end gap-4 mt-4">
                  <Button variant="outline" onClick={resetFilters} className="flex items-center gap-2">
                    <X className="h-4 w-4" />
                    Xóa bộ lọc
                  </Button>
                  <Button onClick={handleAdvancedSearch} className="bg-blue-600 hover:bg-blue-700">
                    Áp dụng bộ lọc
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <DialogAddTeachingSchedule />
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500">Bộ lọc đang áp dụng:</span>
              {Object.entries(advancedFilters).map(([key, value]) => {
                if (value) {
                  return (
                    <Badge key={key} variant="secondary" className="flex items-center gap-1">
                      {key === 'maGiangVien' && 'Mã GV: '}
                      {key === 'chucDanh' && 'Chức danh: '}
                      {key === 'tenMonHoc' && 'Môn học: '}
                      {key === 'soTietThucHien' && 'Tiết thực hiện: '}
                      {key === 'soTietThucTe' && 'Tiết thực tế: '}
                      {value}
                      <button
                        onClick={() => setAdvancedFilters({...advancedFilters, [key]: ''})}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>

        <TableTeachingSchedule data={filteredData || []} />

        <div className='mx-auto gap-x-5 mt-8 flex justify-center'>
          <PaginationTeachingSchedule 
            currentPage={1} 
            totalPages={1} 
            onPageChange={() => {}} 
            totalItems={filteredData?.length || 0} 
          />
        </div>
      </div>
    )
  );
}
