import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import LecturerActions from './LecturerActions';
import ExcelActions from '../ExcelActions/ExcelActions';
import { UserType } from '@/lib/apis/types';

interface LecturerTableProps {
  lectureData: UserType[];
  onImport?: (data: UserType[]) => void;
}

export default function LecturerTable({ lectureData, onImport }: LecturerTableProps) {
  return (
    lectureData && (
      <div className='w-full'>

        <Table>
          <TableHeader>
            <TableRow className='bg-indigo-600 text-white!'>
              <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                ID
              </TableHead>
              <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                Tên người dùng
              </TableHead>
              <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                Email
              </TableHead>
              <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                Vai trò
              </TableHead>
              <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                Quyền
              </TableHead>
              <TableHead className='text-lg font-semibold tracking-wide uppercase text-white!'>
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lectureData.map((user) => (
              <TableRow key={user.id} className='bg-background hover:bg-secondary'>
                <TableCell className='font-medium'>{user.id}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.userEmail}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{(user.admin && 'Admin') || 'Người dùng'}</TableCell>
                <TableCell className='flex justify-center items-center'>
                  <LecturerActions user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  );
}
