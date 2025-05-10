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

export default function TableTeachingSchedule({ data }: { data: PhanCongGiangDayType[] }) {
  const { mutate } = useDeletePhanCongGiangDayMutation();

  return (
    <div className='w-full p-4 bg-white rounded-xl shadow-md'>
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
              thao tác
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
                <Button
                  onClick={() => {
                    mutate(item.idPhanCong);
                  }}
                >
                  xoá
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
