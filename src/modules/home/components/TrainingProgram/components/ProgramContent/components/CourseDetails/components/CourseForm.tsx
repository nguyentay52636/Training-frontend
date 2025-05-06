'use client';

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CourseType, BlockKnowType } from "@/lib/apis/types";
import {
    getLoaiHocPhanDisplay,
    loaiHocPhanOptions
} from "@/lib/utils/courseHelpers";

interface CourseFormProps {
    isCreatingCourse: boolean;
    formData: {
        tenHP: string;
        soTinChi: number;
        soTietLyThuyet: number;
        soTietThucHanh: number;
        soTietThucTap: number;
        loaiHocPhan: string;
        heSoHocPhan: number;
    };
    selectedKhoiId: string | null;
    selectedKienThucId: string | null;
    selectedCourses: CourseType[];
    khoiKienThucData: BlockKnowType[];
    loading: boolean;
    preselectedKnowledgeId?: number;
    onInputChange: (field: string, value: string | number) => void;
    onKhoiKienThucChange: (value: string) => void;
    onKienThucChange: (value: string) => void;
    onSelectCourse: (value: string) => void;
    onRemoveCourse: (maHP: string) => void;
    onCreateCourse: () => void;
    onSaveCourses: () => void;
    isFormValid: () => boolean;
}

export default function CourseForm({
    isCreatingCourse,
    formData,
    selectedKhoiId,
    selectedKienThucId,
    selectedCourses,
    khoiKienThucData,
    loading,
    preselectedKnowledgeId,
    onInputChange,
    onKhoiKienThucChange,
    onKienThucChange,
    onSelectCourse,
    onRemoveCourse,
    onCreateCourse,
    onSaveCourses,
    isFormValid
}: CourseFormProps) {
    // Derived state for hocPhanList
    const selectedKhoi = khoiKienThucData.find(khoi => khoi.idKhoiKienThuc?.toString() === selectedKhoiId);
    const hocPhanList: CourseType[] = selectedKhoi ?
        selectedKhoi.kienThucList.flatMap(kienThuc => kienThuc.hocPhanList || []) :
        [];

    return (
        <>
            {isCreatingCourse ? (
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Tên học phần</Label>
                        <Input
                            value={formData.tenHP}
                            onChange={(e) => onInputChange('tenHP', e.target.value)}
                            placeholder="Nhập tên học phần"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Số tín chỉ</Label>
                        <Input
                            type="number"
                            value={formData.soTinChi}
                            onChange={(e) => onInputChange('soTinChi', parseInt(e.target.value))}
                            placeholder="Nhập số tín chỉ"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Loại học phần</Label>
                        <Select
                            value={formData.loaiHocPhan}
                            onValueChange={(value) => onInputChange('loaiHocPhan', value)}
                        >
                            <SelectTrigger>
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
                    <div className="space-y-2">
                        <Label>Số tiết lý thuyết</Label>
                        <Input
                            type="number"
                            value={formData.soTietLyThuyet}
                            onChange={(e) => onInputChange('soTietLyThuyet', parseInt(e.target.value))}
                            placeholder="Nhập số tiết lý thuyết"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Số tiết thực hành</Label>
                        <Input
                            type="number"
                            value={formData.soTietThucHanh}
                            onChange={(e) => onInputChange('soTietThucHanh', parseInt(e.target.value))}
                            placeholder="Nhập số tiết thực hành"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Số tiết thực tập</Label>
                        <Input
                            type="number"
                            value={formData.soTietThucTap}
                            onChange={(e) => onInputChange('soTietThucTap', parseInt(e.target.value))}
                            placeholder="Nhập số tiết thực tập"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Hệ số học phần</Label>
                        <Input
                            type="number"
                            value={formData.heSoHocPhan}
                            onChange={(e) => onInputChange('heSoHocPhan', parseInt(e.target.value))}
                            placeholder="Nhập hệ số học phần"
                        />
                    </div>
                    <div className="col-span-2 flex justify-end mt-4">
                        <Button
                            variant="default"
                            className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={onCreateCourse}
                            disabled={loading || !isFormValid()}
                        >
                            {loading ? "Đang tạo..." : "Tạo học phần"}
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <Select
                        value={selectedKhoiId || undefined}
                        onValueChange={onKhoiKienThucChange}
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
                            onValueChange={onKienThucChange}
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
                        onValueChange={onSelectCourse}
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
                                            onClick={() => onRemoveCourse(course.maHP)}
                                        >
                                            x
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

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
        </>
    );
} 