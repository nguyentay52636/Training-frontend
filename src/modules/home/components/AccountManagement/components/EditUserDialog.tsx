import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { UserType } from '@/lib/apis/types';
import { useForm } from 'react-hook-form';

export default function EditUserDialog({ user }: { user: UserType }) {
  const handleEditUser = () => {
    console.log(123);
  };

  const form = useForm({
    defaultValues: {
      maTaiKhoan: user.id || '',
      hoTen: user.userName || '',
      email: user.userEmail || '',
      sdt: user.role || '',
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' className='text-blue-600 hover:text-blue-700'>
          <Pencil className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px] rounded-lg'>
        <DialogHeader>
          <DialogTitle className='text-blue-900 text-xl'>Chỉnh sửa tài khoản</DialogTitle>
          <DialogDescription className='text-gray-600'>
            Vui lòng nhập thông tin cần chỉnh sửa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleEditUser)}>
          <div className='grid gap-5 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='maTaiKhoan' className='text-right font-medium text-gray-700'>
                Mã Tài Khoản
              </Label>
              <Input
                id='maTaiKhoan'
                {...form.register('maTaiKhoan')}
                className='col-span-3 rounded-lg border-gray-200 focus:ring-blue-400'
                placeholder='VD: TK004'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='hoTen' className='text-right font-medium text-gray-700'>
                Họ Tên
              </Label>
              <Input
                id='hoTen'
                {...form.register('hoTen')}
                className='col-span-3 rounded-lg border-gray-200 focus:ring-blue-400'
                placeholder='VD: Nguyễn Văn D'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='email' className='text-right font-medium text-gray-700'>
                Email
              </Label>
              <Input
                id='email'
                {...form.register('email')}
                className='col-span-3 rounded-lg border-gray-200 focus:ring-blue-400'
                placeholder='VD: email@sgu.edu.vn'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='sdt' className='text-right font-medium text-gray-700'>
                Số Điện Thoại
              </Label>
              <Input
                id='sdt'
                {...form.register('sdt')}
                className='col-span-3 rounded-lg border-gray-200 focus:ring-blue-400'
                placeholder='VD: 0931234567'
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type='submit'
              className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-lg'
            >
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
