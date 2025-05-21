'use client';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CourseType } from "@/lib/apis/types";
import { createCourse, updateCourse } from "@/lib/apis/CourseApi";
import { useState } from "react";
import { toast } from "react-toastify";

interface CourseDialogProps {
    isOpen: boolean;
    onClose: () => void;
    course?: CourseType;
    onSuccess: () => void;
}

export default function CourseDialog({
    isOpen,
    onClose,
    course,
    onSuccess,
}: CourseDialogProps) {
    const [formData, setFormData] = useState<Partial<CourseType>>({
        maHP: course?.maHP || '',
        tenHP: course?.tenHP || '',
        soTinChi: course?.soTinChi || 0,
        soTietLyThuyet: course?.soTietLyThuyet || 0,
        soTietThucHanh: course?.soTietThucHanh || 0,
        soTietThucTap: course?.soTietThucTap || 0,
        loaiHocPhan: course?.loaiHocPhan || 1,
        heSoHocPhan: course?.heSoHocPhan || 1,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (course?.idHocPhan) {
                await updateCourse(course.idHocPhan, formData as CourseType);
                toast.success('Cập nhật học phần thành công');
            } else {
                await createCourse(formData as CourseType);
                toast.success('Tạo học phần mới thành công');
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error saving course:', error);
            toast.error(course ? 'Không thể cập nhật học phần' : 'Không thể tạo học phần mới');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{course ? 'Sửa học phần' : 'Tạo học phần mới'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="maHP">Mã học phần</Label>
                        <Input
                            id="maHP"
                            value={formData.maHP}
                            onChange={(e) => setFormData({ ...formData, maHP: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tenHP">Tên học phần</Label>
                        <Input
                            id="tenHP"
                            value={formData.tenHP}
                            onChange={(e) => setFormData({ ...formData, tenHP: e.target.value })}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="soTinChi">Số tín chỉ</Label>
                            <Input
                                id="soTinChi"
                                type="number"
                                value={formData.soTinChi}
                                onChange={(e) => setFormData({ ...formData, soTinChi: Number(e.target.value) })}
                                required
                                min="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="heSoHocPhan">Hệ số học phần</Label>
                            <Input
                                id="heSoHocPhan"
                                type="number"
                                value={formData.heSoHocPhan}
                                onChange={(e) => setFormData({ ...formData, heSoHocPhan: Number(e.target.value) })}
                                required
                                min="0"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="soTietLyThuyet">Số tiết lý thuyết</Label>
                            <Input
                                id="soTietLyThuyet"
                                type="number"
                                value={formData.soTietLyThuyet}
                                onChange={(e) => setFormData({ ...formData, soTietLyThuyet: Number(e.target.value) })}
                                required
                                min="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="soTietThucHanh">Số tiết thực hành</Label>
                            <Input
                                id="soTietThucHanh"
                                type="number"
                                value={formData.soTietThucHanh}
                                onChange={(e) => setFormData({ ...formData, soTietThucHanh: Number(e.target.value) })}
                                required
                                min="0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="soTietThucTap">Số tiết thực tập</Label>
                            <Input
                                id="soTietThucTap"
                                type="number"
                                value={formData.soTietThucTap}
                                onChange={(e) => setFormData({ ...formData, soTietThucTap: Number(e.target.value) })}
                                required
                                min="0"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Hủy
                        </Button>
                        <Button type="submit">
                            {course ? 'Cập nhật' : 'Tạo mới'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 