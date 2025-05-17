'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { CourseType, BlockKnowType } from "@/lib/apis/types";
import { toast } from 'react-toastify';
import { getBlockKnows } from "@/lib/apis/blockKnowApi";
import { updateKnowByCourse, getKnowledgeById } from "@/lib/apis/KnowsApi";
import { createCourse } from "@/lib/apis/CourseApi";
import CourseForm from './CourseForm';

// Create a utility function for showing toast notifications
const showToast = (type: 'success' | 'error', message: string) => {
    if (type === 'success') {
        toast.success(message);
    } else {
        toast.error(message);
    }
};

interface DialogAddCourseProps {
    preselectedKnowledgeId?: number;
    onCoursesAdded?: () => void;
    triggerButton?: React.ReactNode;
}

export default function DialogAddCourse({
    preselectedKnowledgeId,
    onCoursesAdded,
    triggerButton
}: DialogAddCourseProps) {
    const [khoiKienThucData, setKhoiKienThucData] = useState<BlockKnowType[]>([]);
    const [selectedKhoiId, setSelectedKhoiId] = useState<string | null>(null);
    const [selectedCourses, setSelectedCourses] = useState<CourseType[]>([]);
    const [selectedKienThucId, setSelectedKienThucId] = useState<string | null>(
        preselectedKnowledgeId ? preselectedKnowledgeId.toString() : null
    );
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isCreatingCourse, setIsCreatingCourse] = useState(false);
    const [formData, setFormData] = useState({
        tenHP: '',
        soTinChi: 0,
        soTietLyThuyet: 0,
        soTietThucHanh: 0,
        soTietThucTap: 0,
        loaiHocPhan: '',
        heSoHocPhan: 0
    });

    // Update selectedKienThucId when preselectedKnowledgeId changes
    useEffect(() => {
        if (preselectedKnowledgeId) {
            setSelectedKienThucId(preselectedKnowledgeId.toString());
        }
    }, [preselectedKnowledgeId]);

    // Fetch block knowledge data when component mounts
    useEffect(() => {
        const fetchBlockKnows = async () => {
            try {
                setLoading(true);
                const data = await getBlockKnows();
                setKhoiKienThucData(data);
            } catch (error) {
                console.error("Error fetching block knowledge data:", error);
                showToast('error', "Có lỗi xảy ra khi tải danh sách khối kiến thức");
            } finally {
                setLoading(false);
            }
        };

        fetchBlockKnows();
    }, []);

    // Handle adding course when selected
    const handleSelectCourse = (value: string) => {
        const selectedKhoi = khoiKienThucData.find(khoi => khoi.idKhoiKienThuc?.toString() === selectedKhoiId);
        const hocPhanList: CourseType[] = selectedKhoi ?
            selectedKhoi.kienThucList.flatMap(kienThuc => kienThuc.hocPhanList || []) :
            [];

        const hocPhan = hocPhanList.find(hp => hp.maHP === value);
        if (hocPhan && !selectedCourses.some(course => course.maHP === hocPhan.maHP)) {
            setSelectedCourses([...selectedCourses, hocPhan]);
        } else {
            showToast('error', "Học phần đã được chọn trước đó!");
        }
    };

    const handleRemoveCourse = (maHP: string) => {
        setSelectedCourses(selectedCourses.filter(course => course.maHP !== maHP));
    };

    const handleInputChange = (field: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCreateCourse = async () => {
        try {
            setLoading(true);
            const newCourse = await createCourse({
                ...formData,
                maHP: `HP${Date.now()}${Math.floor(Math.random() * 1000)}`,
                tongSoTiet: formData.soTietLyThuyet + formData.soTietThucHanh + formData.soTietThucTap,
            });

            if (newCourse) {
                showToast('success', "Tạo học phần thành công");
                setSelectedCourses([...selectedCourses, newCourse]);
                setIsCreatingCourse(false);
                resetForm();
            }
        } catch (error) {
            console.error("Error creating course:", error);
            showToast('error', "Có lỗi xảy ra khi tạo học phần");
        } finally {
            setLoading(false);
        }
    };

    const handleSaveCourses = async () => {
        if (selectedCourses.length === 0) {
            showToast('error', "Vui lòng chọn ít nhất một học phần");
            return;
        }

        if (!selectedKienThucId) {
            showToast('error', "Vui lòng chọn kiến thức để thêm học phần");
            return;
        }

        try {
            setLoading(true);

            // Lấy id của các học phần đã chọn mới
            const newCourseIds = selectedCourses.map(course => course.idHocPhan).filter(id => id !== undefined) as number[];

            // Cập nhật kiến thức với danh sách học phần đã chọn
            if (newCourseIds.length > 0) {
                // Chuẩn bị dữ liệu cho API call
                const knowledgeId = parseInt(selectedKienThucId, 10);

                // Lấy thông tin hiện tại của kiến thức
                const currentKnowledge = await getKnowledgeById(knowledgeId);

                // Lấy danh sách ID học phần hiện tại
                const existingCourseIds = currentKnowledge.idHocPhan || [];

                // Kết hợp danh sách ID hiện tại với danh sách ID mới
                // và loại bỏ các ID trùng lặp bằng Set
                const combinedCourseIds = [...new Set([...existingCourseIds, ...newCourseIds])];

                // Chuẩn bị dữ liệu cập nhật
                const updateData = {
                    tenKienThuc: currentKnowledge.tenKienThuc,
                    idHocPhan: combinedCourseIds,
                    loaiHocPhan: currentKnowledge.loaiHocPhan || "Bắt buộc"
                };

                // Gọi API cập nhật
                await updateKnowByCourse(knowledgeId, updateData);
            }

            showToast('success', "Lưu học phần thành công");
            setSelectedCourses([]);

            // Call the callback to refresh the parent component
            if (onCoursesAdded) {
                onCoursesAdded();
            }

            setOpen(false);
        } catch (error) {
            console.error("Error saving courses:", error);
            showToast('error', "Có lỗi xảy ra khi lưu học phần");
        } finally {
            setLoading(false);
        }
    };

    // Reset form về trạng thái ban đầu
    const resetForm = () => {
        setFormData({
            tenHP: '',
            soTinChi: 0,
            soTietLyThuyet: 0,
            soTietThucHanh: 0,
            soTietThucTap: 0,
            loaiHocPhan: '',
            heSoHocPhan: 0
        });
    };

    // Kiểm tra form hợp lệ
    const isFormValid = () => {
        return formData.tenHP.trim() !== '';
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerButton || (
                    <Button variant="outline" className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600">
                        Thêm học phần/môn học phần
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-[1.8rem]">Thêm học phần</DialogTitle>
                    <DialogDescription className="text-[1rem]">
                        Vui lòng chọn khối kiến thức và học phần bên dưới.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end mb-4">
                    <Button
                        variant="outline"
                        className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                        onClick={() => setIsCreatingCourse(!isCreatingCourse)}
                    >
                        {isCreatingCourse ? "Chọn học phần có sẵn" : "Tạo học phần mới"}
                    </Button>
                </div>

                <CourseForm
                    isCreatingCourse={isCreatingCourse}
                    formData={formData}
                    selectedKhoiId={selectedKhoiId}
                    selectedKienThucId={selectedKienThucId}
                    selectedCourses={selectedCourses}
                    khoiKienThucData={khoiKienThucData}
                    loading={loading}
                    preselectedKnowledgeId={preselectedKnowledgeId}
                    onInputChange={handleInputChange}
                    onKhoiKienThucChange={(value) => {
                        setSelectedKhoiId(value);
                    }}
                    onKienThucChange={(value) => setSelectedKienThucId(value)}
                    onSelectCourse={handleSelectCourse}
                    onRemoveCourse={handleRemoveCourse}
                    onCreateCourse={handleCreateCourse}
                    onSaveCourses={handleSaveCourses}
                    isFormValid={isFormValid}
                />
            </DialogContent>
        </Dialog>
    );
}

