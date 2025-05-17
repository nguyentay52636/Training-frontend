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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CourseType } from "@/lib/apis/types";
import { createCourse } from "@/lib/apis/CourseApi";
import { addCourseToKnowledge } from "@/lib/apis/KnowsApi";
import { toast } from 'react-toastify';
import { loaiHocPhanOptions } from "@/lib/utils/courseHelpers";
import { PlusCircle } from "lucide-react";

interface DialogAddNewCourseProps {
    knowledgeId: number;
    onCourseAdded: () => void;
}

export default function DialogAddNewCourse({ knowledgeId, onCourseAdded }: DialogAddNewCourseProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form fields
    const [maHP, setMaHP] = useState('');
    const [tenHP, setTenHP] = useState('');
    const [soTinChi, setSoTinChi] = useState<number>(0);
    const [soTietLyThuyet, setSoTietLyThuyet] = useState<number>(0);
    const [soTietThucHanh, setSoTietThucHanh] = useState<number>(0);
    const [soTietThucTap, setSoTietThucTap] = useState<number>(0);
    const [loaiHocPhan, setLoaiHocPhan] = useState<string>('0');
    const [tongSoTiet, setTongSoTiet] = useState<number>(0);
    const [heSoHocPhan, setHeSoHocPhan] = useState<number>(1);

    const resetForm = () => {
        setMaHP('');
        setTenHP('');
        setSoTinChi(0);
        setSoTietLyThuyet(0);
        setSoTietThucHanh(0);
        setSoTietThucTap(0);
        setLoaiHocPhan('0');
        setTongSoTiet(0);
        setHeSoHocPhan(1);
    };

    const handleSubmit = async () => {
        if (!maHP || !tenHP) {
            toast.error("Vui lòng nhập đầy đủ thông tin học phần");
            return;
        }

        try {
            setLoading(true);

            // Create the new course
            const newCourse: CourseType = {
                maHP,
                tenHP,
                soTinChi,
                soTietLyThuyet,
                soTietThucHanh,
                soTietThucTap,
                loaiHocPhan,
                tongSoTiet,
                heSoHocPhan,
            };

            // Add the course
            const createdCourse = await createCourse(newCourse);

            // Add the course to the knowledge
            if (createdCourse && createdCourse.idHocPhan) {
                await addCourseToKnowledge(knowledgeId, createdCourse.idHocPhan);
                toast.success("Thêm học phần thành công");
                resetForm();
                setOpen(false);
                onCourseAdded();
            } else {
                throw new Error("Không nhận được thông tin học phần từ hệ thống");
            }
        } catch (error) {
            console.error("Error adding course:", error);
            toast.error("Có lỗi xảy ra khi thêm học phần");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
                >
                    <PlusCircle size={16} />
                    Thêm học phần mới
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-[1.8rem]">Thêm học phần mới</DialogTitle>
                    <DialogDescription className="text-[1rem]">
                        Nhập thông tin học phần mới để thêm vào kiến thức
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-700 mb-1 block">Mã học phần *</label>
                            <Input
                                className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                placeholder="Nhập mã học phần"
                                value={maHP}
                                onChange={(e) => setMaHP(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 mb-1 block">Tên học phần *</label>
                            <Input
                                className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                placeholder="Nhập tên học phần"
                                value={tenHP}
                                onChange={(e) => setTenHP(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-gray-700 mb-1 block">Số tín chỉ</label>
                            <Input
                                type="number"
                                className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                placeholder="Số tín chỉ"
                                value={soTinChi}
                                onChange={(e) => setSoTinChi(Number(e.target.value) || 0)}
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 mb-1 block">Loại học phần</label>
                            <Select
                                value={loaiHocPhan}
                                onValueChange={(value) => setLoaiHocPhan(value)}
                            >
                                <SelectTrigger className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full">
                                    <SelectValue placeholder="Chọn loại học phần" />
                                </SelectTrigger>
                                <SelectContent>
                                    {loaiHocPhanOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.display}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="text-gray-700 mb-1 block">Hệ số học phần</label>
                            <Input
                                type="number"
                                className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                placeholder="Hệ số học phần"
                                value={heSoHocPhan}
                                onChange={(e) => setHeSoHocPhan(Number(e.target.value) || 0)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="text-gray-700 mb-1 block">Số tiết lý thuyết</label>
                            <Input
                                type="number"
                                className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                placeholder="Số tiết lý thuyết"
                                value={soTietLyThuyet}
                                onChange={(e) => setSoTietLyThuyet(Number(e.target.value) || 0)}
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 mb-1 block">Số tiết thực hành</label>
                            <Input
                                type="number"
                                className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                placeholder="Số tiết thực hành"
                                value={soTietThucHanh}
                                onChange={(e) => setSoTietThucHanh(Number(e.target.value) || 0)}
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 mb-1 block">Số tiết thực tập</label>
                            <Input
                                type="number"
                                className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                placeholder="Số tiết thực tập"
                                value={soTietThucTap}
                                onChange={(e) => setSoTietThucTap(Number(e.target.value) || 0)}
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 mb-1 block">Tổng số tiết</label>
                            <Input
                                type="number"
                                className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                placeholder="Tổng số tiết"
                                value={tongSoTiet}
                                onChange={(e) => setTongSoTiet(Number(e.target.value) || 0)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-2 mt-6">
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => setOpen(false)}
                        disabled={loading}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="default"
                        className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Đang lưu..." : "Lưu"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
} 