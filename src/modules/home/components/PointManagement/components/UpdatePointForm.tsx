import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { PointType } from "@/lib/apis/types";
import { updatePoint } from "@/lib/apis/pointApi";
import { toast } from 'react-toastify';

// Schema validation với zod
const formSchema = z.object({
    maSV: z.string().min(1, "Mã sinh viên không được để trống").max(10, "Mã sinh viên quá dài"),
    tenSV: z.string().min(1, "Họ và tên không được để trống").max(100, "Họ và tên quá dài"),
    diemChuyenCan: z.number().min(0, "Điểm phải từ 0").max(10, "Điểm không được vượt quá 10"),
    diemThucHanh: z.number().min(0, "Điểm phải từ 0").max(10, "Điểm không được vượt quá 10"),
    diemGiuaKy: z.number().min(0, "Điểm phải từ 0").max(10, "Điểm không được vượt quá 10"),
    diemCuoiKy: z.number().min(0, "Điểm phải từ 0").max(10, "Điểm không được vượt quá 10"),
    bangDiemMon: z.string().min(1, "Bảng điểm môn không được để trống").max(2, "Bảng điểm chỉ chấp nhận A, B, C, D, F"),
    hocKy: z.number().min(1, "Học kỳ phải lớn hơn 0").max(12, "Học kỳ không hợp lệ"),
    nam: z.string().min(4, "Năm học không hợp lệ").max(9, "Năm học quá dài"),
    lop: z.string().min(1, "Lớp không được để trống").max(20, "Tên lớp quá dài"),
});

interface UpdatePointFormProps {
    point: PointType;
    onClose: (isOpen: boolean) => void;
    onUpdateSuccess: () => void;
}

export default function UpdatePointForm({ point, onClose, onUpdateSuccess }: UpdatePointFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<PointType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...point
        },
    });

    const handleUpdatePoint = async (values: PointType) => {
        setIsSubmitting(true);
        try {
            if (!point.idCotDiem) {
                throw new Error("Không tìm thấy ID điểm cần cập nhật");
            }
            const response = await updatePoint(point.idCotDiem, values);
            if (response) {
                toast.success('Cập nhật điểm thành công!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                onUpdateSuccess();
                onClose(false);
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi cập nhật điểm", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleUpdatePoint)}
                className="space-y-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        name="maSV"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex flex-col gap-3">
                                        <FormLabel className="text-lg font-semibold text-gray-800">Mã Sinh Viên</FormLabel>
                                        <Input
                                            className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                            {...field}
                                            placeholder="VD: SV010"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="tenSV"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormControl>
                                    <div className="flex flex-col gap-3">
                                        <FormLabel className="text-lg font-semibold text-gray-800">Họ và Tên</FormLabel>
                                        <Input
                                            className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                            {...field}
                                            placeholder="VD: Phạm Thị K"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="diemChuyenCan"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex flex-col gap-3">
                                        <FormLabel className="text-lg font-semibold text-gray-800">Điểm Chuyên Cần</FormLabel>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                            {...field}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                                            placeholder="VD: 6.0"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="diemThucHanh"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex flex-col gap-3">
                                        <FormLabel className="text-lg font-semibold text-gray-800">Điểm Thực Hành</FormLabel>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                            {...field}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                                            placeholder="VD: 5.5"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="diemGiuaKy"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex flex-col gap-3">
                                        <FormLabel className="text-lg font-semibold text-gray-800">Điểm Giữa Kỳ</FormLabel>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                            {...field}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                                            placeholder="VD: 6.0"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="diemCuoiKy"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex flex-col gap-3">
                                        <FormLabel className="text-lg font-semibold text-gray-800">Điểm Cuối Kỳ</FormLabel>
                                        <Input
                                            type="number"
                                            step="0.1"
                                            className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                            {...field}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                                            placeholder="VD: 5.5"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="bangDiemMon"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex flex-col gap-3">
                                        <FormLabel className="text-lg font-semibold text-gray-800">Bảng Điểm Môn</FormLabel>
                                        <Input
                                            className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                            {...field}
                                            placeholder="VD: C"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="hocKy"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex flex-col gap-3">
                                        <FormLabel className="text-lg font-semibold text-gray-800">Học Kỳ</FormLabel>
                                        <Input
                                            type="number"
                                            className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                                            placeholder="VD: 1"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="nam"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex flex-col gap-3">
                                        <FormLabel className="text-lg font-semibold text-gray-800">Năm Học</FormLabel>
                                        <Input
                                            className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                            {...field}
                                            placeholder="VD: 2024-2025"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="lop"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex flex-col gap-3">
                                        <FormLabel className="text-lg font-semibold text-gray-800">Lớp</FormLabel>
                                        <Input
                                            className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                            {...field}
                                            placeholder="VD: DHKTPM17C"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-end gap-6 mt-8">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onClose(false)}
                        className="rounded-full border-gray-400 text-gray-700 hover:bg-gray-200 hover:text-gray-900 px-8 py-3 text-lg font-semibold shadow-md transition-all duration-200"
                    >
                        Hủy
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 px-8 py-3 text-lg text-white font-semibold shadow-md transition-all duration-200"
                    >
                        {isSubmitting ? "Đang xử lý..." : "Cập nhật Điểm"}
                    </Button>
                </div>
            </form>
        </Form>
    );
} 