import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { CourseType } from '@/lib/apis/types'
import { updateCourse } from '@/lib/apis/CourseApi'
import { Save } from 'lucide-react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

// Schema validation với zod
const formSchema = z.object({
    maHP: z.string().min(1, "Mã học phần không được để trống").max(10, "Mã học phần quá dài"),
    tenHP: z.string().min(1, "Tên học phần không được để trống").max(100, "Tên học phần quá dài"),
    soTinChi: z.number().min(0, "Số tín chỉ phải lớn hơn hoặc bằng 0"),
    soTietLyThuyet: z.number().min(0, "Số tiết lý thuyết phải lớn hơn hoặc bằng 0"),
    soTietThucHanh: z.number().min(0, "Số tiết thực hành phải lớn hơn hoặc bằng 0"),
    soTietThucTap: z.number().min(0, "Số tiết thực tập phải lớn hơn hoặc bằng 0"),
    loaiHocPhan: z.number().min(0, "Loại học phần không được để trống").max(2, "Loại học phần không hợp lệ"),
    heSoHocPhan: z.number().min(0, "Hệ số học phần phải lớn hơn hoặc bằng 0"),
    tongSoTiet: z.number().min(0, "Tổng số tiết phải lớn hơn hoặc bằng 0"),
});

type FormValues = z.infer<typeof formSchema>;

interface DialogEditManagerCourseProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingCourse: CourseType;
    onSuccess: () => void;
}

export default function DialogEditManagerCourse({
    open,
    onOpenChange,
    editingCourse,
    onSuccess
}: DialogEditManagerCourseProps) {
    const [loading, setLoading] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            maHP: "",
            tenHP: "",
            soTinChi: undefined,
            soTietLyThuyet: undefined,
            soTietThucHanh: undefined,
            soTietThucTap: undefined,
            loaiHocPhan: 0,
            heSoHocPhan: undefined,
            tongSoTiet: 0,
        },
    });

    useEffect(() => {
        if (open && editingCourse) {
            form.reset(editingCourse);
        }
    }, [open, editingCourse, form]);

    const calculateTotalHours = () => {
        const lyThuyet = form.getValues("soTietLyThuyet") || 0;
        const thucHanh = form.getValues("soTietThucHanh") || 0;
        const thucTap = form.getValues("soTietThucTap") || 0;
        return lyThuyet + thucHanh + thucTap;
    };

    const updateTotalHours = () => {
        const total = calculateTotalHours();
        form.setValue("tongSoTiet", total);
    };

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "soTietLyThuyet" || name === "soTietThucHanh" || name === "soTietThucTap") {
                updateTotalHours();
            }
        });
        return () => subscription.unsubscribe();
    }, [form]);

    const handleSubmit = async (values: FormValues) => {
        setLoading(true);
        try {
            const updatedFormData = {
                ...values,
                tongSoTiet: calculateTotalHours(),
                loaiHocPhan: Number(values.loaiHocPhan),
                heSoHocPhan: Number(values.heSoHocPhan)
            };

            await updateCourse(editingCourse.idHocPhan!, updatedFormData as CourseType);
            toast.success('Cập nhật học phần thành công', {
                description: 'Thông tin học phần đã được cập nhật'
            });
            onSuccess();
            onOpenChange(false);
        } catch (error: any) {
            toast.error('Không thể cập nhật học phần', {
                description: error.message || 'Đã xảy ra lỗi. Vui lòng thử lại sau'
            });
            console.error('Error updating course:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Chỉnh sửa học phần
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                name="maHP"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex flex-col gap-3">
                                                <FormLabel className="text-lg font-semibold text-gray-800">Mã học phần</FormLabel>
                                                <Input
                                                    className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                                    {...field}
                                                    placeholder="VD: INT1234"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="soTinChi"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex flex-col gap-3">
                                                <FormLabel className="text-lg font-semibold text-gray-800">Số tín chỉ</FormLabel>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max="20"
                                                    className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                                    {...field}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (value === '' || /^\d+$/.test(value)) {
                                                            field.onChange(parseInt(value) || undefined);
                                                        }
                                                    }}
                                                    placeholder="VD: 3"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            name="tenHP"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex flex-col gap-3">
                                            <FormLabel className="text-lg font-semibold text-gray-800">Tên học phần</FormLabel>
                                            <Input
                                                className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                                {...field}
                                                placeholder="VD: Lập trình Web"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-sm" />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                name="soTietLyThuyet"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex flex-col gap-3">
                                                <FormLabel className="text-lg font-semibold text-gray-800">Số tiết lý thuyết</FormLabel>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                                    {...field}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (value === '' || /^\d+$/.test(value)) {
                                                            field.onChange(parseInt(value) || undefined);
                                                            updateTotalHours();
                                                        }
                                                    }}
                                                    onBlur={() => {
                                                        updateTotalHours();
                                                    }}
                                                    placeholder="VD: 30"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="soTietThucHanh"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex flex-col gap-3">
                                                <FormLabel className="text-lg font-semibold text-gray-800">Số tiết thực hành</FormLabel>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                                    {...field}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (value === '' || /^\d+$/.test(value)) {
                                                            field.onChange(parseInt(value) || undefined);
                                                            updateTotalHours();
                                                        }
                                                    }}
                                                    onBlur={() => {
                                                        updateTotalHours();
                                                    }}
                                                    placeholder="VD: 15"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="soTietThucTap"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex flex-col gap-3">
                                                <FormLabel className="text-lg font-semibold text-gray-800">Số tiết thực tập</FormLabel>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                                    {...field}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (value === '' || /^\d+$/.test(value)) {
                                                            field.onChange(parseInt(value) || undefined);
                                                            updateTotalHours();
                                                        }
                                                    }}
                                                    onBlur={() => {
                                                        updateTotalHours();
                                                    }}
                                                    placeholder="VD: 0"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                name="loaiHocPhan"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex flex-col gap-3">
                                                <FormLabel className="text-lg font-semibold text-gray-800">Loại học phần</FormLabel>
                                                <Select
                                                    value={String(field.value)}
                                                    onValueChange={(value) => field.onChange(Number(value))}
                                                >
                                                    <SelectTrigger className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full">
                                                        <SelectValue placeholder="Chọn loại" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="0">Bắt buộc</SelectItem>
                                                        <SelectItem value="1">Tự chọn</SelectItem>
                                                        <SelectItem value="2">Thực tập</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="heSoHocPhan"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex flex-col gap-3">
                                                <FormLabel className="text-lg font-semibold text-gray-800">Hệ số học phần</FormLabel>
                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    className="rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm py-3 px-6 text-base transition-all duration-200 w-full"
                                                    {...field}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                                                    placeholder="VD: 1.0"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tongSoTiet" className="text-lg font-semibold text-gray-800">Tổng số tiết</Label>
                            <Input
                                id="tongSoTiet"
                                value={calculateTotalHours()}
                                readOnly
                                disabled
                                className="rounded-full border-gray-300 bg-gray-100 py-3 px-6 text-base transition-all duration-200 w-full"
                            />
                        </div>

                        <DialogFooter className="mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="rounded-full border-gray-400 text-gray-700 hover:bg-gray-200 hover:text-gray-900 px-8 py-3 text-lg font-semibold shadow-md transition-all duration-200"
                            >
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 px-8 py-3 text-lg text-white font-semibold shadow-md transition-all duration-200"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        Đang lưu...
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <Save className="mr-2 h-4 w-4" />
                                        Lưu thay đổi
                                    </div>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
