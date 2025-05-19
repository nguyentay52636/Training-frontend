import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { ThongTinChung } from '@/lib/apis/types';

interface DialogViewProgramProps {
    data: ThongTinChung;
}

export default function DialogViewProgram({ data }: DialogViewProgramProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant='outline'
                    size='sm'
                    className='gap-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                >
                    <Eye className='w-4 h-4' />
                    Xem chi tiết
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[600px] rounded-lg'>
                <DialogHeader>
                    <DialogTitle className='text-blue-900 text-xl'>Chi tiết chương trình</DialogTitle>
                    <DialogDescription className='text-gray-600'>
                        Thông tin chi tiết về chương trình đào tạo
                    </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label className='text-right font-medium text-gray-700'>ID:</label>
                        <div className='col-span-3 text-gray-600'>{data.id}</div>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label className='text-right font-medium text-gray-700'>Tên chương trình:</label>
                        <div className='col-span-3 text-gray-600'>{data.tenChuongTrinh}</div>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label className='text-right font-medium text-gray-700'>Bậc:</label>
                        <div className='col-span-3 text-gray-600'>{data.bac}</div>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label className='text-right font-medium text-gray-700'>Loại bằng:</label>
                        <div className='col-span-3 text-gray-600'>{data.loaiBang}</div>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label className='text-right font-medium text-gray-700'>Loại hình đào tạo:</label>
                        <div className='col-span-3 text-gray-600'>{data.loaiHinhDaoTao}</div>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label className='text-right font-medium text-gray-700'>Thời gian:</label>
                        <div className='col-span-3 text-gray-600'>{data.thoiGian}</div>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label className='text-right font-medium text-gray-700'>Số tín chỉ:</label>
                        <div className='col-span-3 text-gray-600'>{data.soTinChi}</div>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label className='text-right font-medium text-gray-700'>Khoa quản lý:</label>
                        <div className='col-span-3 text-gray-600'>{data.khoaQuanLy}</div>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label className='text-right font-medium text-gray-700'>Ngôn ngữ:</label>
                        <div className='col-span-3 text-gray-600'>{data.ngonNgu}</div>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label className='text-right font-medium text-gray-700'>Khóa tuyển:</label>
                        <div className='col-span-3 text-gray-600'>{data.khoaTuyen}</div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
