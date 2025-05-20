import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { UserType, Role } from '@/lib/apis/types';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateUserAPI } from '@/lib/apis/userApi';
import { useQueryClient } from '@tanstack/react-query';

interface RoleOption {
  value: number;
  label: string;
}

const roles: RoleOption[] = [
  { value: 1, label: 'Giảng viên' },
  { value: 2, label: 'Quản trị viên' },
];

interface FormValues {
  userName: string;
  userEmail: string;
  role: number;
}

export default function EditUserDialog({ user }: { user: UserType }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<FormValues>({
    defaultValues: {
      userName: user.userName || '',
      userEmail: user.userEmail || '',
      role: user.role || roles[0].value,
    },
  });

  const handleEditUser = async (data: FormValues) => {
    try {
      if (!user.id) {
        throw new Error('User ID is required');
      }

      await updateUserAPI(user.id, {
        userName: data.userName,
        userEmail: data.userEmail,
        role: data.role,
      });

      // Invalidate and refetch users list
      queryClient.invalidateQueries({ queryKey: ['users'] });

      toast.success('Cập nhật tài khoản thành công!');
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật tài khoản');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleEditUser)} className='grid gap-5 py-4'>
            <FormField
              control={form.control}
              name='userName'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel className='text-right font-medium text-gray-700'>
                    Tên người dùng
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='col-span-3 rounded-lg border-gray-200 focus:ring-blue-400'
                      placeholder='Nhập tên người dùng'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='userEmail'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel className='text-right font-medium text-gray-700'>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className='col-span-3 rounded-lg border-gray-200 focus:ring-blue-400'
                      placeholder='VD: email@sgu.edu.vn'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel className='text-right font-medium text-gray-700'>Vai trò</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(Number(value));
                    }}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className='col-span-3'>
                        <SelectValue placeholder='Chọn vai trò' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value.toString()}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type='submit'
                className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-lg'
              >
                Lưu thay đổi
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
