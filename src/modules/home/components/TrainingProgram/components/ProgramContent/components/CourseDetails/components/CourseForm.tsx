'use client';

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CourseType, BlockKnowType } from "@/lib/apis/types";
import { useEffect, useState } from "react";
import { getAllCourse, deleteCourse } from "@/lib/apis/CourseApi";
import { Plus, Pencil, Trash2 } from "lucide-react";
import CourseDialog from "./CourseDialog";
import { toast } from "react-toastify";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CourseFormProps {
    selectedKhoiId: string | null;
    selectedKienThucId: string | null;
    selectedCourses: CourseType[];
    khoiKienThucData: BlockKnowType[];
    loading: boolean;
    onSelectCourse: (value: string) => void;
    onRemoveCourse: (maHP: string) => void;
    onSaveCourses: () => void;
}

export default function CourseForm({
    selectedKhoiId,
    selectedKienThucId,
    selectedCourses,
    khoiKienThucData,
    loading,
    onSelectCourse,
    onRemoveCourse,
    onSaveCourses,
}: CourseFormProps) {
    const [allCourses, setAllCourses] = useState<CourseType[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [editingCourse, setEditingCourse] = useState<CourseType | undefined>();
    const [courseToDelete, setCourseToDelete] = useState<CourseType | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getAllCourse();
                setAllCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
                toast.error('Không thể tải danh sách học phần');
            }
        };
        fetchCourses();
    }, []);

    const handleDeleteCourse = async (course: CourseType) => {
        setCourseToDelete(course);
    };

    const confirmDelete = async () => {
        if (!courseToDelete?.idHocPhan) return;

        try {
            await deleteCourse(courseToDelete.idHocPhan);
            setAllCourses(allCourses.filter(course => course.maHP !== courseToDelete.maHP));
            onRemoveCourse(courseToDelete.maHP);
            toast.success('Xóa học phần thành công');
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('Không thể xóa học phần');
        } finally {
            setCourseToDelete(null);
        }
    };

    const handleSuccess = async () => {
        try {
            const data = await getAllCourse();
            setAllCourses(data);
            toast.success(editingCourse ? 'Cập nhật học phần thành công' : 'Tạo học phần mới thành công');
        } catch (error) {
            console.error('Error refreshing courses:', error);
            toast.error('Không thể cập nhật danh sách học phần');
        }
    };

    // Derived state for hocPhanList
    const selectedKhoi = khoiKienThucData.find(khoi => khoi.idKhoiKienThuc?.toString() === selectedKhoiId);
    const hocPhanList: CourseType[] = selectedKhoi ?
        selectedKhoi.kienThucList.flatMap(kienThuc => kienThuc.hocPhanList || []) :
        [];

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <Label>Chọn học phần</Label>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsCreating(true)}
                        className="flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Tạo học phần mới
                    </Button>
                </div>

                <Select
                    onValueChange={(value) => onSelectCourse(value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Chọn học phần" />
                    </SelectTrigger>
                    <SelectContent>
                        {allCourses.map((course) => (
                            <SelectItem
                                key={course.idHocPhan}
                                value={course.maHP}
                                disabled={selectedCourses.some(c => c.maHP === course.maHP)}
                            >
                                {course.tenHP} - {course.maHP} ({course.soTinChi} tín chỉ)
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {selectedCourses.length > 0 && (
                    <div className="space-y-2">
                        <Label>Học phần đã chọn</Label>
                        <div className="space-y-2">
                            {selectedCourses.map((course) => (
                                <div key={course.maHP} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                    <span>{course.tenHP} - {course.maHP}</span>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setEditingCourse(course)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteCourse(course)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end mt-4">
                <Button
                    variant="default"
                    className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={onSaveCourses}
                    disabled={loading || selectedCourses.length === 0 || !selectedKienThucId}
                >
                    {loading ? "Đang lưu..." : "Lưu"}
                </Button>
            </div>

            <CourseDialog
                isOpen={isCreating || !!editingCourse}
                onClose={() => {
                    setIsCreating(false);
                    setEditingCourse(undefined);
                }}
                course={editingCourse}
                onSuccess={handleSuccess}
            />

            <AlertDialog open={!!courseToDelete} onOpenChange={() => setCourseToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa học phần</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa học phần {courseToDelete?.tenHP} ({courseToDelete?.maHP})?
                            Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
} 