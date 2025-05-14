import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';

export default function MajorTable({
  major,
}: {
  major: {
    idHocPhan: number;
    maHP: string;
    tenHP: string;
    soTinChi: number;
    soTietLyThuyet: number;
    soTietThucHanh: number;
    soTietThucTap: number;
    tongSoTiet: number;
    loaiHocPhan: number;
    heSoHocPhan: number;
  };
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>STT</TableHead>
          <TableHead>Mã học phần</TableHead>
          <TableHead className='text-center'>Số TC</TableHead>
          <TableHead className='text-center'>Số tiết</TableHead>
          <TableHead className='text-center'>Lý thuyết</TableHead>
          <TableHead className='text-center'>Thực hành</TableHead>
          <TableHead className='text-center'>Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className='text-center'>{major.idHocPhan}</TableCell>
          <TableCell>{major.maHP}</TableCell>
          <TableCell className='text-center'>{major.soTinChi}</TableCell>
          <TableCell className='text-center'>{major.tongSoTiet}</TableCell>
          <TableCell className='text-center'>{major.soTietLyThuyet}</TableCell>
          <TableCell className='text-center'>{major.soTietThucHanh}</TableCell>
          <TableCell>
            <div className='flex gap-2 justify-center'>
              <button className='text-blue-600 hover:text-blue-800 cursor-pointer'>
                <Pencil size={20} />
              </button>
              <button className='text-red-600 hover:text-red-800 cursor-pointer'>
                <Trash2 size={20} />
              </button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
