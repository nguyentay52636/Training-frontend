import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { HocKyList } from '@/lib/apis/types';
import { Pencil, Trash2 } from 'lucide-react';

export default function MajorTable({ major }: { major: HocKyList }) {
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
        {major.hocPhanList.map((monHoc) => (
          <TableRow key={monHoc.heSoHocPhan}>
            <TableCell className='text-center'>{major.idHocPhan}</TableCell>
            <TableCell>{monHoc.maHP}</TableCell>
            <TableCell className='text-center'>{monHoc.soTinChi}</TableCell>
            <TableCell className='text-center'>{monHoc.tongSoTiet}</TableCell>
            <TableCell className='text-center'>{monHoc.soTietLyThuyet}</TableCell>
            <TableCell className='text-center'>{monHoc.soTietThucHanh}</TableCell>
            <TableCell>
              <div className='flex gap-2 justify-center'>
                <Button
                  className='text-blue-600 hover:text-blue-800 cursor-pointer'
                  variant='ghost'
                >
                  <Pencil size={20} />
                </Button>
                <Button className='text-red-600 hover:text-red-800 cursor-pointer' variant='ghost'>
                  <Trash2 size={20} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
