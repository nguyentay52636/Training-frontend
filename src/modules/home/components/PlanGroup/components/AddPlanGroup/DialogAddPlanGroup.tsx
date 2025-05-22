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
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { createKeHoachMoNhom } from '@/lib/apis/keHoachMoNhomApi';
import { getAllCourse } from '@/lib/apis/CourseApi';
import { CourseType } from '@/lib/apis/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface DialogAddPlanGroupProps {
    onSuccess?: () => void;
}

export default function DialogAddPlanGroup({ onSuccess }: DialogAddPlanGroupProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [formData, setFormData] = useState({
        idHocPhan: undefined as number | undefined,
        namHoc: '',
        soNhom: 0,
        hocKy: 1,
        soLuongSinhVien: 0,
    });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getAllCourse();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
                toast.error('Không thể tải danh sách học phần');
            }
        };
        if (open) {
            fetchCourses();
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.idHocPhan) {
            toast.error('Vui lòng chọn học phần');
            return;
        }
        try {
            setLoading(true);
            await createKeHoachMoNhom(formData);
            toast.success('Thêm kế hoạch mở nhóm thành công');
            setOpen(false);
            onSuccess?.();
        } catch (err) {
            console.error('Error adding group plan:', err);
            toast.error('Có lỗi xảy ra khi thêm kế hoạch mở nhóm');
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
                    <Plus className='mr-2 h-5 w-5' /> Thêm kế hoạch mở nhóm
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[500px] rounded-lg'>
                <DialogHeader>
                    <DialogTitle className='text-blue-900 text-xl'>Thêm kế hoạch mở nhóm mới</DialogTitle>
                    <DialogDescription className='text-gray-600'>
                        Vui lòng nhập đầy đủ thông tin kế hoạch mở nhóm để thêm vào hệ thống.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Học phần</label>
                        <Select
                            value={formData.idHocPhan?.toString()}
                            onValueChange={(value) => setFormData({ ...formData, idHocPhan: Number(value) })}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn học phần">
                                    {formData.idHocPhan && courses.find(c => c.idHocPhan === formData.idHocPhan) && (
                                        `${courses.find(c => c.idHocPhan === formData.idHocPhan)?.maHP} - ${courses.find(c => c.idHocPhan === formData.idHocPhan)?.tenHP}`
                                    )}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((course) => (
                                    <SelectItem
                                        key={course.idHocPhan}
                                        value={course.idHocPhan?.toString() || ''}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="font-medium">{course.maHP}</span>
                                        <span className="text-gray-500">-</span>
                                        <span>{course.tenHP}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
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
                        <label className="text-sm font-medium">Học kỳ</label>
                        <Input
                            type="number"
                            min={1}
                            max={3}
                            placeholder="Nhập học kỳ (1-3)"
                            value={formData.hocKy}
                            onChange={(e) => setFormData({ ...formData, hocKy: parseInt(e.target.value) })}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Số nhóm</label>
                        <Input
                            type="number"
                            min={1}
                            max={20}
                            placeholder="Nhập số nhóm (1-20)"
                            value={formData.soNhom}
                            onChange={(e) => setFormData({ ...formData, soNhom: parseInt(e.target.value) })}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Số lượng sinh viên</label>
                        <Input
                            type="number"
                            min={1}
                            max={200}
                            placeholder="Nhập số lượng sinh viên (1-200)"
                            value={formData.soLuongSinhVien}
                            onChange={(e) => setFormData({ ...formData, soLuongSinhVien: parseInt(e.target.value) })}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                        >
                            {loading ? 'Đang xử lý...' : 'Thêm kế hoạch'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
