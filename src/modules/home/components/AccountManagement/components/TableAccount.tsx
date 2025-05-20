import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import EditUserDialog from './EditUserDialog';
import { UserType } from '@/lib/apis/types';
import { useDeleteUserMutation } from './mutations';

interface TableAccountProps {
  data: UserType[];
}

const getRoleName = (roleId: number) => {
  switch (roleId) {
    case 1:
      return 'Giảng viên';
    case 2:
      return 'Quản trị viên';
    default:
      return 'Không xác định';
  }
};

export default function TableAccount({ data }: TableAccountProps) {
  const { mutate } = useDeleteUserMutation();

  return (
    <div className='rounded-md border border-gray-200 shadow-sm bg-white'>
      <Table>
        <TableHeader>
          <TableRow className='bg-indigo-600 text-white'>
            <TableHead className='text-white font-semibold py-4'>Mã tài khoản</TableHead>
            <TableHead className='text-white font-semibold py-4'>Họ tên</TableHead>
            <TableHead className='text-white font-semibold py-4'>Email</TableHead>
            <TableHead className='text-white font-semibold py-4'>Vai trò</TableHead>
            <TableHead className='text-white font-semibold py-4'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((user) => (
              <TableRow
                key={user.id}
                className='border-b border-gray-100 hover:bg-blue-50 transition-colors'
              >
                <TableCell className='py-4'>{user.id}</TableCell>
                <TableCell className='py-4'>{user.userName}</TableCell>
                <TableCell className='py-4'>{user.userEmail}</TableCell>
                <TableCell className='py-4'>{getRoleName(user.role)}</TableCell>
                <TableCell className='py-4'>
                  <div className='flex gap-2'>
                    <EditUserDialog user={user} />
                    <Button
                      variant='outline'
                      size='sm'
                      className='text-red-600 hover:text-red-700'
                      onClick={() => {
                        mutate(user.id);
                      }}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className='h-24 text-center text-gray-500'>
                Không tìm thấy tài khoản nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
