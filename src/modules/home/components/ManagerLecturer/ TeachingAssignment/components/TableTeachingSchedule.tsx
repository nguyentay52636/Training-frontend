import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { PhanCongGiangDayType } from '@/lib/apis/types';
import { useDeletePhanCongGiangDayMutation } from './AddTeachingSchedule/mutations';
import EditScheduleDialog from './AddTeachingSchedule/EditScheduleDialog';
import { Pencil, Trash2, FileDown, FileUp } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

export default function TableTeachingSchedule({ data }: { data: PhanCongGiangDayType[] }) {
  const { mutate } = useDeletePhanCongGiangDayMutation();

  const handleExportExcel = () => {
    try {
      // Transform data for Excel
      const excelData = data.map((item, index) => ({
        'STT': index + 1,
        'Mã giảng viên': item.giangVien.maGiangVien,
        'Tên giảng viên': item.giangVien.tenGiangVien,
        'Chức danh': item.giangVien.chucDanh,
        'Tên môn học': item.tenMonHoc,
        'Số tiết thực hiện': item.soTietThucHien,
        'Số tiết thực tế': item.soTietThucTe,
      }));

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Lịch giảng dạy');

      // Save file
      XLSX.writeFile(wb, 'lich_giang_day.xlsx');
      toast.success('Xuất file Excel thành công!');
    } catch (error) {
      console.error('Lỗi khi xuất Excel:', error);
      toast.error('Có lỗi xảy ra khi xuất file Excel!');
    }
  };

  const handleImportExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Here you would typically validate and process the imported data
        console.log('Imported data:', jsonData);
        toast.success('Nhập file Excel thành công!');
      } catch (error) {
        console.error('Lỗi khi nhập Excel:', error);
        toast.error('Có lỗi xảy ra khi nhập file Excel!');
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className='w-full p-4 bg-white rounded-xl shadow-md'>
      <div className="flex justify-end gap-4 mb-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                className="rounded-full bg-green-600 hover:bg-green-700 text-white shadow-md border-none flex items-center h-10 px-6 text-base font-medium gap-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                onClick={handleExportExcel}
              >
                <FileDown className="h-5 w-5 mr-2" />
                Xuất Excel
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Xuất dữ liệu ra file Excel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                className="rounded-full bg-green-600 hover:bg-green-700 text-white shadow-md border-none flex items-center h-10 px-6 text-base font-medium gap-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                onClick={() => document.getElementById('excel-upload')?.click()}
              >
                <FileUp className="h-5 w-5 mr-2" />
                Nhập Excel
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Nhập dữ liệu từ file Excel</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <input
          type="file"
          id="excel-upload"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={handleImportExcel}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className='bg-indigo-600 text-white'>
            <TableHead className='text-lg font-semibold tracking-wide uppercase'>STT</TableHead>
            <TableHead className='text-lg font-semibold tracking-wide uppercase'>
              Mã giảng viên
            </TableHead>
            <TableHead className='text-lg font-semibold tracking-wide uppercase'>
              Tên giảng viên
            </TableHead>
            <TableHead className='text-lg font-semibold tracking-wide uppercase'>
              Chức danh
            </TableHead>
            <TableHead className='text-lg font-semibold tracking-wide uppercase'>
              Tên môn học
            </TableHead>
            <TableHead className='text-lg font-semibold tracking-wide uppercase'>
              Số tiết thực hiện
            </TableHead>
            <TableHead className='text-lg font-semibold tracking-wide uppercase'>
              Số tiết thực tế
            </TableHead>
            <TableHead className='text-lg font-semibold tracking-wide uppercase'>
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.idPhanCong} className='hover:bg-muted/50 transition'>
              <TableCell className='font-medium'>{index + 1}</TableCell>
              <TableCell>{item.giangVien.maGiangVien}</TableCell>
              <TableCell>{item.giangVien.tenGiangVien}</TableCell>
              <TableCell>{item.giangVien.chucDanh}</TableCell>
              <TableCell>{item.tenMonHoc}</TableCell>
              <TableCell>{item.soTietThucHien}</TableCell>
              <TableCell>{item.soTietThucTe}</TableCell>
              <TableCell>
                <div className='flex gap-x-2'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <EditScheduleDialog scheduleData={item}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors duration-200"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </EditScheduleDialog>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chỉnh sửa</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn xóa lịch giảng dạy này không? Hành động này không thể hoàn tác.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => mutate(item.idPhanCong)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Xóa
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Xóa</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
