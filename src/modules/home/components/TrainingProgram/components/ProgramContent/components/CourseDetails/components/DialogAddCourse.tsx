'use client';

import { useState } from "react";
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
import khoiKienThucData, { HocPhan } from "../../DataBlock";
import { Plus } from "lucide-react";

export default function DialogAddCourse() {
    const [selectedKhoiId, setSelectedKhoiId] = useState<string | null>(null);
    const [selectedMaHP, setSelectedMaHP] = useState<string | null>(null);
    const [selectedLoaiHocPhan, setSelectedLoaiHocPhan] = useState<string | null>(null);
    const [selectedCourses, setSelectedCourses] = useState<HocPhan[]>([]);

    const selectedKhoi = khoiKienThucData.find(khoi => khoi.idKhoiKienThuc.toString() === selectedKhoiId);
    const hocPhanList = selectedKhoi ? selectedKhoi.hocPhanList : [];

    // Handle adding course immediately when selected
    const handleSelectCourse = (value: string) => {
        const hocPhan = hocPhanList.find(hp => hp.maHP === value);
        if (hocPhan && !selectedCourses.some(course => course.maHP === hocPhan.maHP)) {
            setSelectedCourses([...selectedCourses, hocPhan]);
            setSelectedMaHP(null); // Reset the course selection
        } else {
            console.log("Học phần đã được chọn trước đó!");
        }
    };

    const handleRemoveCourse = (maHP: string) => {
        setSelectedCourses(selectedCourses.filter(course => course.maHP !== maHP));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600">
                    Thêm học phần/môn học phần
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-[1.8rem]">Thêm học phần</DialogTitle>
                    <DialogDescription className="text-[1rem]">
                        Vui lòng chọn khối kiến thức, học phần và loại học phần bên dưới.
                    </DialogDescription>
                </DialogHeader>

                <Select onValueChange={(value) => {
                    setSelectedKhoiId(value);
                    setSelectedMaHP(null);
                    setSelectedLoaiHocPhan(null);
                }}>
                    <SelectTrigger className="w-full mt-4 h-12 text-[1.1rem] text-black">
                        <SelectValue placeholder="Chọn khối kiến thức" />
                    </SelectTrigger>
                    <SelectContent>
                        {khoiKienThucData.map((khoi) => (
                            <SelectItem key={khoi.idKhoiKienThuc} value={khoi.idKhoiKienThuc.toString()}>
                                {khoi.tenKhoiKienThuc}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    disabled={!selectedKhoiId}
                    onValueChange={(value) => handleSelectCourse(value)} // Add course on selection
                >
                    <SelectTrigger className="w-full mt-4 h-12 text-[1.1rem] text-black">
                        <SelectValue placeholder="Chọn học phần" />
                    </SelectTrigger>
                    <SelectContent>
                        {hocPhanList.map((hocPhan) => (
                            <SelectItem key={hocPhan.maHP} value={hocPhan.maHP}>
                                {hocPhan.tenHP}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select

                    onValueChange={(value) => setSelectedLoaiHocPhan(value)}
                >
                    <SelectTrigger className="w-full mt-4 h-12 text-[1.1rem] text-black">
                        <SelectValue placeholder="Loại học phần" />
                    </SelectTrigger>
                    <SelectContent>
                        {[...new Set(hocPhanList.map(hp => hp.loaiHocPhan))].map((loai, index) => (
                            <SelectItem key={index} value={loai}>
                                {loai}
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
                                    <span>{course.tenHP} ({course.maHP}) - {course.soTinChi} tín chỉ</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-black text-white  text-[18px] hover:bg-black hover:text-white cursor-pointer hover:bg-shadow-xl"
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
                        className=" cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Lưu
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

