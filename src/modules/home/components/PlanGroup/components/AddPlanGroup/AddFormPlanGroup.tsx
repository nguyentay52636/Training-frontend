import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { KeHoachMoNhomType, CourseType } from '@/lib/apis/types';
import { createKeHoachMoNhom } from '@/lib/apis/keHoachMoNhomApi';
import { getAllCourse } from '@/lib/apis/CourseApi';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
    idHocPhan: z.number({
        required_error: "Vui lòng chọn học phần",
    }),
    namHoc: z.string()
        .min(1, "Vui lòng nhập năm học")
        .regex(/^\d{4}-\d{4}$/, "Năm học phải có định dạng YYYY-YYYY (ví dụ: 2023-2024)"),
    hocKy: z.number()
        .min(1, "Học kỳ phải lớn hơn 0")
        .max(3, "Học kỳ không được lớn hơn 3"),
    soNhom: z.number()
        .min(1, "Số nhóm phải lớn hơn 0")
        .max(20, "Số nhóm không được lớn hơn 20"),
    soLuongSinhVien: z.number()
        .min(1, "Số lượng sinh viên phải lớn hơn 0")
        .max(200, "Số lượng sinh viên không được lớn hơn 200"),
});

interface AddFormPlanGroupProps {
    onClose: (isOpen: boolean) => void;
    onSuccess?: () => void;
}

export default function AddFormPlanGroup({ onClose, onSuccess }: AddFormPlanGroupProps) {
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            namHoc: '',
            soNhom: 0,
            hocKy: 1,
            soLuongSinhVien: 0,
            idHocPhan: undefined
        },
    });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getAllCourse();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
                toast.error('Không thể tải danh sách học phần');
            }
        };
        fetchCourses();
    }, []);

    const handleAddGroup = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            await createKeHoachMoNhom(values);
            toast.success('Thêm kế hoạch mở nhóm thành công');
            onClose(false);
            onSuccess?.();
        } catch (err) {
            console.error('Error adding group:', err);
            toast.error('Có lỗi xảy ra khi thêm kế hoạch mở nhóm');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddGroup)} className='space-y-6'>
                <FormField
                    name='idHocPhan'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='flex gap-x-5'>
                                    <FormLabel className='text-right w-[100px] font-medium text-gray-700'>
                                        Học phần
                                    </FormLabel>
                                    <Select
                                        onValueChange={(value) => field.onChange(Number(value))}
                                        value={field.value?.toString()}
                                    >
                                        <SelectTrigger className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'>
                                            <SelectValue placeholder='Chọn học phần' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {courses.map((course) => (
                                                <SelectItem key={course.idHocPhan} value={course.idHocPhan?.toString() || ''}>
                                                    {course.maHP} - {course.tenHP}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name='namHoc'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='flex gap-x-5'>
                                    <FormLabel className='text-right w-[100px] font-medium text-gray-700'>
                                        Năm học
                                    </FormLabel>
                                    <Input
                                        className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                                        {...field}
                                        placeholder='Nhập năm học (ví dụ: 2023-2024)'
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name='hocKy'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='flex gap-x-5'>
                                    <FormLabel className='text-right w-[100px] font-medium text-gray-700'>
                                        Học kỳ
                                    </FormLabel>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={3}
                                        className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        placeholder='Nhập học kỳ (1-3)'
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name='soNhom'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='flex gap-x-5'>
                                    <FormLabel className='text-right w-[100px] font-medium text-gray-700'>
                                        Số nhóm
                                    </FormLabel>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={20}
                                        className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        placeholder='Nhập số nhóm (1-20)'
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name='soLuongSinhVien'
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='flex gap-x-5'>
                                    <FormLabel className='text-right w-[100px] font-medium text-gray-700'>
                                        Số lượng SV
                                    </FormLabel>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={200}
                                        className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        placeholder='Nhập số lượng sinh viên (1-200)'
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-end gap-x-4'>
                    <Button type='button' variant='outline' onClick={() => onClose(false)}>
                        Hủy
                    </Button>
                    <Button type='submit' disabled={loading}>
                        {loading ? 'Đang thêm...' : 'Thêm'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
