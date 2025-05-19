// src/components/DialogAddAccount.tsx
'use client';

import { useForm } from 'react-hook-form';
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
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Role } from '@/lib/apis/types';
import { useAddUserMutation } from './mutations';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { toast } from 'react-toastify';

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
  password: string;
  role: number;
}

export default function DialogAddAccount() {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      userName: '',
      userEmail: '',
      password: '',
      role: roles[0].value,
    },
  });

  const addUserMutation = useAddUserMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      await addUserMutation.mutateAsync({
        userName: data.userName,
        userEmail: data.userEmail,
        password: data.password,
        role: data.role,
      });

      toast.success('Thêm tài khoản thành công!');
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thêm tài khoản');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-md'>
          <Plus className='mr-2 h-5 w-5' /> Thêm Tài Khoản
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px] rounded-lg'>
        <DialogHeader>
          <DialogTitle className='text-blue-900 text-xl'>Thêm Tài Khoản Mới</DialogTitle>
          <DialogDescription className='text-gray-600'>
            Vui lòng nhập đầy đủ thông tin tài khoản để thêm vào hệ thống.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-5 py-4'>
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
              name='password'
              render={({ field }) => (
                <FormItem className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel className='text-right font-medium text-gray-700'>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='password'
                      className='col-span-3 rounded-lg border-gray-200 focus:ring-blue-400'
                      placeholder='Nhập mật khẩu'
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
                disabled={addUserMutation.isPending}
              >
                {addUserMutation.isPending ? 'Đang thêm...' : 'Thêm Tài Khoản'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
