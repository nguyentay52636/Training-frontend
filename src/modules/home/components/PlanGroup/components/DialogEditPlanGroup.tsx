import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { KeHoachMoNhomType, CourseType } from '@/lib/apis/types';
import { updateKeHoachMoNhom } from '@/lib/apis/keHoachMoNhomApi';
import { getAllCourse } from '@/lib/apis/CourseApi';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DialogEditPlanGroupProps {
    isOpen: boolean;
    onClose: () => void;
    data: KeHoachMoNhomType;
    onSuccess?: () => void;
}

export default function DialogEditPlanGroup({ isOpen, onClose, data, onSuccess }: DialogEditPlanGroupProps) {
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [formData, setFormData] = useState<KeHoachMoNhomType>({
        id: data.id,
        idHocPhan: data.idHocPhan,
        namHoc: data.namHoc,
        soNhom: data.soNhom,
        hocKy: data.hocKy,
        soLuongSinhVien: data.soLuongSinhVien
    });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getAllCourse();
                setCourses(data);
            } catch (error) {
                toast.error('Không thể tải danh sách học phần');
            }
        };
        if (isOpen) {
            fetchCourses();
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await updateKeHoachMoNhom(formData.id!, formData);
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa kế hoạch mở nhóm</DialogTitle>
                    <DialogDescription>
                        Vui lòng điền thông tin để cập nhật kế hoạch mở nhóm
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='space-y-4'>
                        <div className='flex gap-x-5'>
                            <label className='text-right w-[100px] font-medium text-gray-700'>
                                Học phần
                            </label>
                            <Select
                                value={formData.idHocPhan?.toString()}
                                onValueChange={(value) => setFormData({ ...formData, idHocPhan: Number(value) })}
                            >
                                <SelectTrigger className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'>
                                    <SelectValue placeholder='Chọn học phần'>
                                        {formData.idHocPhan && courses.find(c => c.idHocPhan === formData.idHocPhan) && (
                                            `${courses.find(c => c.idHocPhan === formData.idHocPhan)?.maHP} - ${courses.find(c => c.idHocPhan === formData.idHocPhan)?.tenHP}`
                                        )}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course) => (
                                        <SelectItem key={course.idHocPhan} value={course.idHocPhan?.toString() || ''}>
                                            {course.maHP} - {course.tenHP}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex gap-x-5'>
                            <label className='text-right w-[100px] font-medium text-gray-700'>
                                Năm học
                            </label>
                            <Input
                                className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                                value={formData.namHoc}
                                onChange={(e) => setFormData({ ...formData, namHoc: e.target.value })}
                                placeholder='vd: 2023-2024'
                            />
                        </div>
                        <div className='flex gap-x-5'>
                            <label className='text-right w-[100px] font-medium text-gray-700'>
                                Học kỳ
                            </label>
                            <Input
                                type="number"
                                className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                                value={formData.hocKy}
                                onChange={(e) => setFormData({ ...formData, hocKy: Number(e.target.value) })}
                                placeholder='Nhập học kỳ'
                            />
                        </div>
                        <div className='flex gap-x-5'>
                            <label className='text-right w-[100px] font-medium text-gray-700'>
                                Số nhóm
                            </label>
                            <Input
                                type="number"
                                className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                                value={formData.soNhom}
                                onChange={(e) => setFormData({ ...formData, soNhom: Number(e.target.value) })}
                                placeholder='Nhập số nhóm'
                            />
                        </div>
                        <div className='flex gap-x-5'>
                            <label className='text-right w-[100px] font-medium text-gray-700'>
                                Số lượng SV
                            </label>
                            <Input
                                type="number"
                                className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                                value={formData.soLuongSinhVien}
                                onChange={(e) => setFormData({ ...formData, soLuongSinhVien: Number(e.target.value) })}
                                placeholder='Nhập số lượng sinh viên'
                            />
                        </div>
                    </div>
                    <div className='flex justify-end gap-x-4'>
                        <Button type='button' variant='outline' onClick={onClose}>
                            Hủy
                        </Button>
                        <Button type='submit' disabled={loading}>
                            {loading ? 'Đang cập nhật...' : 'Cập nhật'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
