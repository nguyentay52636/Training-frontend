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
import { KeHoachMoNhomType } from '@/lib/apis/types';
import { createKeHoachMoNhom } from '@/lib/apis/keHoachMoNhomApi';
import { toast } from 'sonner';

interface AddFormPlanGroupProps {
    onClose: (isOpen: boolean) => void;
    onSuccess?: () => void;
}

export default function AddFormPlanGroup({ onClose, onSuccess }: AddFormPlanGroupProps) {
    const form = useForm<KeHoachMoNhomType>({
        defaultValues: {
            namHoc: '',
            soNhom: 0,
        },
    });

    const handleAddGroup = async (values: KeHoachMoNhomType) => {
        try {
            await createKeHoachMoNhom(values);
            toast.success('Thêm kế hoạch mở nhóm thành công');
            onClose(false);
            onSuccess?.();
        } catch (err) {
            console.error('Error adding group:', err);
            toast.error('Có lỗi xảy ra khi thêm kế hoạch mở nhóm');
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddGroup)} className='space-y-6'>
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
                                        placeholder='vd: 2023-2024'
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
                                        className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        placeholder='vd: 5'
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => onClose(false)}
                    >
                        Hủy
                    </Button>
                    <Button 
                        type="submit"
                        className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-lg'
                    >
                        Thêm kế hoạch
                    </Button>
                </div>
            </form>
        </Form>
    );
}
