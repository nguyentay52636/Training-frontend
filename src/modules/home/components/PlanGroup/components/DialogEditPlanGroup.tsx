import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { KeHoachMoNhomType } from '@/lib/apis/types';
import { updateKeHoachMoNhom } from '@/lib/apis/keHoachMoNhomApi';

interface DialogEditPlanGroupProps {
    isOpen: boolean;
    onClose: () => void;
    data: KeHoachMoNhomType;
    onSuccess?: () => void;
}

export default function DialogEditPlanGroup({ isOpen, onClose, data, onSuccess }: DialogEditPlanGroupProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<KeHoachMoNhomType>({
        id: data.id,
        namHoc: data.namHoc,
        soNhom: data.soNhom,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await updateKeHoachMoNhom(formData.id!, { namHoc: formData.namHoc, soNhom: formData.soNhom });
            toast.success('Cập nhật kế hoạch mở nhóm thành công');
            onClose();
            onSuccess?.();
        } catch (err) {
            console.error('Error updating group plan:', err);
            toast.error('Có lỗi xảy ra khi cập nhật kế hoạch mở nhóm');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='sm:max-w-[500px] rounded-lg'>
                <DialogHeader>
                    <DialogTitle className='text-blue-900 text-xl'>Chỉnh sửa kế hoạch mở nhóm</DialogTitle>
                    <DialogDescription className='text-gray-600'>
                        Vui lòng cập nhật thông tin kế hoạch mở nhóm.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Năm học</label>
                        <Input
                            placeholder="Nhập năm học (vd: 2023-2024)"
                            value={formData.namHoc}
                            onChange={(e) => setFormData({ ...formData, namHoc: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Số nhóm</label>
                        <Input
                            type="number"
                            placeholder="Nhập số nhóm (vd: 5)"
                            value={formData.soNhom}
                            onChange={(e) => setFormData({ ...formData, soNhom: parseInt(e.target.value) })}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Hủy
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={loading}
                            className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                        >
                            {loading ? 'Đang xử lý...' : 'Cập nhật'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
