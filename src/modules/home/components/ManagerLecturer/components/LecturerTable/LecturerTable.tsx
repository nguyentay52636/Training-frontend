import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { lecturerData } from './data';
import LecturerActions from './LecturerActions';
export default function LecturerTable() {
  const lecturers = lecturerData;

  return (
    <div className='w-full'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã giảng viên</TableHead>
            <TableHead>Họ và tên giảng viên</TableHead>
            <TableHead>Chức danh</TableHead>
            <TableHead>Năm phong</TableHead>
            <TableHead>Trình đọ </TableHead>
            <TableHead>Năm tốt nghiệp </TableHead>
            <TableHead>Nước </TableHead>
            <TableHead className=' text-center'>Hành động </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lecturers.map(
            ({ maGiangVien, chucDanh, hoTenGV, namPhong, namTotNghiep, nuoc, trinhDo }) => (
              <TableRow key={maGiangVien} className='bg-background hover:bg-secondary'>
                <TableCell className='font-medium'>{maGiangVien}</TableCell>
                <TableCell>{hoTenGV}</TableCell>
                <TableCell>{chucDanh}</TableCell>
                <TableCell>{namPhong}</TableCell>
                <TableCell>{trinhDo}</TableCell>
                <TableCell>{namTotNghiep}</TableCell>
                <TableCell>{nuoc}</TableCell>
                <TableCell className='flex justify-center items-center'>
                  <LecturerActions />
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
}
