import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import PointManagement from '../pages/PointManagement';

export default function DialogAddPoint() {
    const [open, setOpen] = useState(false);

    const handleCloseDialog = (isOpen: boolean) => {
        if (!isOpen) {
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleCloseDialog}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setOpen(true)}
                    className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-md'
                >
                    <Plus className='mr-2 h-5 w-5' /> Thêm sinh viên
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[500px] rounded-lg'>
                <DialogHeader>
                    <DialogTitle className='text-blue-900 text-xl'>Thêm Giảng Viên Mới</DialogTitle>
                    <DialogDescription className='text-gray-600'>
                        Vui lòng nhập đầy đủ thông tin giảng viên để thêm vào hệ thống.
                    </DialogDescription>
                </DialogHeader>
                <PointManagement />
            </DialogContent>
        </Dialog>
    );
}
