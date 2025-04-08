'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
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

type TeachingScheduleType = {
    maLich: string;
    maGiangVien: string;
    maMon: string;
    phongHoc: string;
    thoiGian: string;
    thu: string;
    lop: string;
};

export default function DialogAddTeachingSchedule({
    open,
    onClose,
}: {
    open: boolean;
    onClose: (isOpen: boolean) => void;
}) {
    const form = useForm<TeachingScheduleType>({
        defaultValues: {
            maLich: '',
            maGiangVien: '',
            maMon: '',
            phongHoc: '',
            thoiGian: '',
            thu: '',
            lop: '',
        },
    });

    const handleAddSchedule = (values: TeachingScheduleType) => {
        console.log('Lịch giảng dạy mới:', values);
        onClose(false);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className='max-w-xl'>
                <DialogHeader>
                    <DialogTitle>Thêm lịch giảng dạy</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddSchedule)} className='space-y-5 pt-2'>
                        {[
                            { name: 'maLich', label: 'Mã lịch', placeholder: 'vd: L001' },
                            { name: 'maGiangVien', label: 'Mã giảng viên', placeholder: 'vd: GV001' },
                            { name: 'maMon', label: 'Mã môn học', placeholder: 'vd: MH101' },
                            { name: 'phongHoc', label: 'Phòng học', placeholder: 'vd: B203' },
                            { name: 'thoiGian', label: 'Thời gian', placeholder: 'vd: 08:00 - 10:00' },
                            { name: 'thu', label: 'Thứ', placeholder: 'vd: Thứ 2' },
                            { name: 'lop', label: 'Lớp', placeholder: 'vd: DHTH17' },
                        ].map((field) => (
                            <FormField
                                key={field.name}
                                name={field.name as keyof TeachingScheduleType}
                                control={form.control}
                                render={({ field: fieldProps }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className='flex gap-x-4 items-center'>
                                                <FormLabel className='w-[120px] font-medium text-gray-700'>
                                                    {field.label}
                                                </FormLabel>
                                                <Input
                                                    {...fieldProps}
                                                    placeholder={field.placeholder}
                                                    className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        <DialogFooter>
                            <Button type='submit' className='ml-auto bg-blue-600 hover:bg-blue-700 rounded-lg'>
                                Thêm lịch
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
