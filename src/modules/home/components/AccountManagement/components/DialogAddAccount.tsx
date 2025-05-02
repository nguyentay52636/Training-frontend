// src/components/DialogAddAccount.tsx
'use client';

import { useState } from 'react';
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
import { Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Định nghĩa type TaiKhoan ngay trong file
export type TaiKhoan = {
  maTaiKhoan: string;
  hoTen: string;
  email: string;
  sdt: string;
};

export default function DialogAddAccount() {
  const [newTaiKhoan, setNewTaiKhoan] = useState<TaiKhoan>({
    maTaiKhoan: '',
    hoTen: '',
    email: '',
    sdt: '',
  });

  const handleAddTaiKhoan = () => {
    console.log(123);
  };

  return (
    <Dialog>
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
        <div className='grid gap-5 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='maTaiKhoan' className='text-right font-medium text-gray-700'>
              Mã Tài Khoản
            </Label>
            <Input
              id='maTaiKhoan'
              value={newTaiKhoan.maTaiKhoan}
              onChange={(e) => setNewTaiKhoan({ ...newTaiKhoan, maTaiKhoan: e.target.value })}
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
              value={newTaiKhoan.hoTen}
              onChange={(e) => setNewTaiKhoan({ ...newTaiKhoan, hoTen: e.target.value })}
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
              value={newTaiKhoan.email}
              onChange={(e) => setNewTaiKhoan({ ...newTaiKhoan, email: e.target.value })}
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
              value={newTaiKhoan.sdt}
              onChange={(e) => setNewTaiKhoan({ ...newTaiKhoan, sdt: e.target.value })}
              className='col-span-3 rounded-lg border-gray-200 focus:ring-blue-400'
              placeholder='VD: 0931234567'
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type='submit'
            onClick={handleAddTaiKhoan}
            className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-lg'
          >
            Thêm Tài Khoản
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
