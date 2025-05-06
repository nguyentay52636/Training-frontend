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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { CourseType, knowledgeType, BlockKnowType } from "@/lib/apis/types";
import { toast } from 'react-toastify';
import { getBlockKnows } from "@/lib/apis/blockKnowApi";
import { addCourseToKnowledge } from "@/lib/apis/KnowsApi";
import {
    getLoaiHocPhanDisplay,
    loaiHocPhanOptions
} from "@/lib/utils/courseHelpers";

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
    const [selectedMaHP, setSelectedMaHP] = useState<string | null>(null);
    const [selectedLoaiHocPhan, setSelectedLoaiHocPhan] = useState<string | null>(null);
    const [selectedCourses, setSelectedCourses] = useState<CourseType[]>([]);
    const [selectedKienThucId, setSelectedKienThucId] = useState<string | null>(
        preselectedKnowledgeId ? preselectedKnowledgeId.toString() : null
    );
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    // Update selectedKienThucId when preselectedKnowledgeId changes
    useEffect(() => {
        if (preselectedKnowledgeId) {
            setSelectedKienThucId(preselectedKnowledgeId.toString());
        }
    }, [preselectedKnowledgeId]);

    // Derived state for hocPhanList
    const selectedKhoi = khoiKienThucData.find(khoi => khoi.idKhoiKienThuc?.toString() === selectedKhoiId);
    const hocPhanList: CourseType[] = selectedKhoi ?
        selectedKhoi.kienThucList.flatMap(kienThuc => kienThuc.hocPhanList || []) :
        [];

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
        const hocPhan = hocPhanList.find(hp => hp.maHP === value);
        if (hocPhan && !selectedCourses.some(course => course.maHP === hocPhan.maHP)) {
            setSelectedCourses([...selectedCourses, hocPhan]);
            setSelectedMaHP(null);
        } else {
            showToast('error', "Học phần đã được chọn trước đó!");
        }
    };

    const handleRemoveCourse = (maHP: string) => {
        setSelectedCourses(selectedCourses.filter(course => course.maHP !== maHP));
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

            // Save each selected course to the knowledge
            const savePromises = selectedCourses.map(async (course) => {
                if (course.idHocPhan) {
                    return await addCourseToKnowledge(parseInt(selectedKienThucId), course.idHocPhan);
                }
            });

            await Promise.all(savePromises);

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
                        Vui lòng chọn khối kiến thức, học phần và loại học phần bên dưới.
                    </DialogDescription>
                </DialogHeader>

                <Select
                    value={selectedKhoiId || undefined}
                    onValueChange={(value) => {
                        setSelectedKhoiId(value);
                        setSelectedMaHP(null);
                        setSelectedLoaiHocPhan(null);
                    }}
                >
                    <SelectTrigger className="w-full mt-4 h-12 text-[1.1rem] text-black">
                        <SelectValue placeholder="Chọn khối kiến thức" />
                    </SelectTrigger>
                    <SelectContent>
                        {khoiKienThucData.map((khoi) => (
                            <SelectItem
                                key={khoi.idKhoiKienThuc}
                                value={khoi.idKhoiKienThuc?.toString() || ""}
                            >
                                {khoi.tenKhoiKienThuc}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {preselectedKnowledgeId ? (
                    <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                        <p className="text-blue-700">Học phần sẽ được thêm vào kiến thức đã chọn.</p>
                    </div>
                ) : (
                    <Select
                        value={selectedKienThucId || undefined}
                        disabled={!selectedKhoiId || loading}
                        onValueChange={(value) => setSelectedKienThucId(value)}
                    >
                        <SelectTrigger className="w-full mt-4 h-12 text-[1.1rem] text-black">
                            <SelectValue placeholder="Chọn kiến thức" />
                        </SelectTrigger>
                        <SelectContent>
                            {selectedKhoi?.kienThucList?.map((kienThuc) => (
                                <SelectItem
                                    key={kienThuc.idKienThuc}
                                    value={kienThuc.idKienThuc?.toString() || ""}
                                >
                                    {kienThuc.tenKienThuc}
                                </SelectItem>
                            )) || []}
                        </SelectContent>
                    </Select>
                )}

                <Select
                    disabled={!selectedKhoiId || loading || hocPhanList.length === 0}
                    onValueChange={(value) => handleSelectCourse(value)}
                >
                    <SelectTrigger className="w-full mt-4 h-12 text-[1.1rem] text-black">
                        <SelectValue placeholder={loading ? "Đang tải..." : "Chọn học phần"} />
                    </SelectTrigger>
                    <SelectContent>
                        {hocPhanList.map((hocPhan) => (
                            <SelectItem key={hocPhan.maHP} value={hocPhan.maHP}>
                                {hocPhan.tenHP} ({hocPhan.maHP})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    disabled={!selectedKhoiId || hocPhanList.length === 0}
                    onValueChange={(value) => setSelectedLoaiHocPhan(value)}
                >
                    <SelectTrigger className="w-full mt-4 h-12 text-[1.1rem] text-black">
                        <SelectValue placeholder="Loại học phần" />
                    </SelectTrigger>
                    <SelectContent>
                        {loaiHocPhanOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.display}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Course Section */}
                {selectedCourses.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Học phần đã chọn:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedCourses.map((course, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                                    <div>
                                        <span className="block">{course.tenHP} ({course.maHP}) - {course.soTinChi} tín chỉ</span>
                                        <span className="text-sm text-gray-600">
                                            Loại: {getLoaiHocPhanDisplay(course.loaiHocPhan)}
                                        </span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-black text-white text-[18px] hover:bg-black hover:text-white cursor-pointer hover:bg-shadow-xl"
                                        onClick={() => handleRemoveCourse(course.maHP)}
                                    >
                                        x
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex justify-end mt-4">
                    <Button
                        variant="default"
                        className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={handleSaveCourses}
                        disabled={loading || selectedCourses.length === 0 || !selectedKienThucId}
                    >
                        {loading ? "Đang lưu..." : "Lưu"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

