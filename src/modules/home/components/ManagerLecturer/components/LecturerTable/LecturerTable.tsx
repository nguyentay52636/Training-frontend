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
          <TableRow className=" bg-indigo-600 text-white!">
            <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Mã giảng viên</TableHead>
            <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Họ và tên giảng viên</TableHead>
            <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Chức danh</TableHead>
            <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Năm phong</TableHead>
            <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Trình đọ </TableHead>
            <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Năm tốt nghiệp </TableHead>
            <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Nước </TableHead>
            <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Hành động </TableHead>
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
