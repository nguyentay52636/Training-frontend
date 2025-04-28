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



// Schema validation với zod
const formSchema = z.object({
    idCotDiem: z.number().min(1, "ID cột điểm phải lớn hơn 0"),
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

export default function AddPointForm({ onClose }: { onClose: (isOpen: boolean) => void }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<PointType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            idCotDiem: undefined,
            maSV: "",
            tenSV: "",
            diemChuyenCan: undefined,
            diemThucHanh: undefined,
            diemGiuaKy: undefined,
            diemCuoiKy: undefined,
            bangDiemMon: "",
            hocKy: undefined,
            nam: "",
            lop: "",
        },
    });

    const handleAddPoint = async (values: PointType) => {
        setIsSubmitting(true);
        try {
            console.log("Dữ liệu điểm số:", values);
            onClose(false);
        } catch (error) {
            console.error("Lỗi khi thêm điểm:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleAddPoint)}
                className="space-y-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-xl"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                        name="idCotDiem"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex flex-col gap-3">
                                        <FormLabel className="text-lg font-semibold text-gray-800">ID Cột Điểm</FormLabel>
                                        <Input
                                            type="number"
                                            className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                            {...field}
                                            onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                                            placeholder="VD: 10"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-red-500 text-sm" />
                            </FormItem>
                        )}
                    />

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
                        {isSubmitting ? "Đang xử lý..." : "Thêm Điểm"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}