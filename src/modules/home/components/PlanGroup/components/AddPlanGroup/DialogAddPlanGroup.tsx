import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { createKeHoachMoNhom } from '@/lib/apis/keHoachMoNhomApi';

interface DialogAddPlanGroupProps {
    onSuccess?: () => void;
}

export default function DialogAddPlanGroup({ onSuccess }: DialogAddPlanGroupProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        namHoc: '',
        soNhom: 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await createKeHoachMoNhom(formData);
            toast.success('Thêm thành công');
            setOpen(false);
            onSuccess?.();
        } catch (error) {
            toast.error('Có lỗi xảy ra khi thêm');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-md'
                >
                    <Plus className='mr-2 h-5 w-5' /> Thêm Giảng Viên
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[500px] rounded-lg'>
                <DialogHeader>
                    <DialogTitle className='text-blue-900 text-xl'>Thêm Giảng Viên Mới</DialogTitle>
                    <DialogDescription className='text-gray-600'>
                        Vui lòng nhập đầy đủ thông tin giảng viên để thêm vào hệ thống.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Năm học</label>
                        <Input
                            placeholder="Nhập năm học"
                            value={formData.namHoc}
                            onChange={(e) => setFormData({ ...formData, namHoc: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Số nhóm</label>
                        <Input
                            type="number"
                            placeholder="Nhập số nhóm"
                            value={formData.soNhom}
                            onChange={(e) => setFormData({ ...formData, soNhom: parseInt(e.target.value) })}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Hủy
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Đang xử lý...' : 'Thêm'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
