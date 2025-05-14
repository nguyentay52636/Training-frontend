import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import LecturerActions from './LecturerActions';
import { LectureType } from '@/lib/apis/types';

interface LecturerTableProps {
  lectureData: LectureType[];
}

export default function LecturerTable({ lectureData }: LecturerTableProps) {
  return (
    lectureData && (
      <div className='w-full'>
        <Table>
          <TableHeader>
            <TableRow className='bg-indigo-600 text-white!'>
              <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                Mã Giảng Viên
              </TableHead>
              <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                Tên Giảng Viên
              </TableHead>
              <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                Chức Danh
              </TableHead>
              <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                Năm Phong
              </TableHead>
              <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                Trình Độ
              </TableHead>
              <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                Nước
              </TableHead>
              <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                Năm Tốt Nghiệp
              </TableHead>
              <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                Hành Động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lectureData.map((giangVien) => (
              <TableRow key={giangVien.maGiangVien} className='bg-background hover:bg-secondary'>
                <TableCell className='font-medium'>{giangVien.maGiangVien}</TableCell>
                <TableCell>{giangVien.tenGiangVien}</TableCell>
                <TableCell>{giangVien.chucDanh}</TableCell>
                <TableCell>{giangVien.namPhong}</TableCell>
                <TableCell>{giangVien.trinhDo}</TableCell>
                <TableCell>{giangVien.nuoc}</TableCell>
                <TableCell>{giangVien.namTotNghiep}</TableCell>
                <TableCell className='flex justify-center items-center'>
                  <LecturerActions user={giangVien} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  );
}
