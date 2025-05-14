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
  selectedColumns: string[];
}

const columnDefs = [
  { key: 'maGiangVien', label: 'Mã Giảng Viên' },
  { key: 'tenGiangVien', label: 'Tên Giảng Viên' },
  { key: 'chucDanh', label: 'Chức Danh' },
  { key: 'namPhong', label: 'Năm Phong' },
  { key: 'trinhDo', label: 'Trình Độ' },
  { key: 'nuoc', label: 'Nước' },
  { key: 'namTotNghiep', label: 'Năm Tốt Nghiệp' },
];

export default function LecturerTable({ lectureData, selectedColumns }: LecturerTableProps) {
  const showAction = selectedColumns.length > 0;
  return (
    lectureData && (
      <div className='w-full'>
        <Table>
          <TableHeader>
            <TableRow className='bg-indigo-600 text-white!'>
              {selectedColumns.length > 0 ? (
                columnDefs.filter(col => selectedColumns.includes(col.key)).map(col => (
                  <TableHead key={col.key} className='text-lg font-semibold tracking-wide uppercase text-white!'>
                    {col.label}
                  </TableHead>
                ))
              ) : null}
              {showAction && (
                <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                  Hành Động
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {lectureData.map((giangVien) => (
              <TableRow key={giangVien.maGiangVien} className='bg-background hover:bg-secondary'>
                {selectedColumns.includes('maGiangVien') && (
                  <TableCell className='font-medium'>{giangVien.maGiangVien}</TableCell>
                )}
                {selectedColumns.includes('tenGiangVien') && (
                  <TableCell>{giangVien.tenGiangVien}</TableCell>
                )}
                {selectedColumns.includes('chucDanh') && (
                  <TableCell>{giangVien.chucDanh}</TableCell>
                )}
                {selectedColumns.includes('namPhong') && (
                  <TableCell>{giangVien.namPhong}</TableCell>
                )}
                {selectedColumns.includes('trinhDo') && (
                  <TableCell>{giangVien.trinhDo}</TableCell>
                )}
                {selectedColumns.includes('nuoc') && (
                  <TableCell>{giangVien.nuoc}</TableCell>
                )}
                {selectedColumns.includes('namTotNghiep') && (
                  <TableCell>{giangVien.namTotNghiep}</TableCell>
                )}
                {showAction && (
                  <TableCell className='flex justify-center items-center'>
                    <LecturerActions user={giangVien} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  );
}
