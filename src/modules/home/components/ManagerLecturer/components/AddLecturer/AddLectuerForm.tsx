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

type LectureType = {
  maGiangVien: string;
  hoTenGV: string;
  chucDanh: string;
  namPhong: string;
  trinhDo: string;
  nuoc: string;
  namTotNghiep: string;
};

export default function AddLectuerForm({ onClose }: { onClose: (isOpen: boolean) => void }) {
  const form = useForm({
    defaultValues: {
      maGiangVien: '',
      hoTenGV: '',
      chucDanh: '',
      namPhong: '',
      trinhDo: '',
      nuoc: '',
      namTotNghiep: '',
    },
  });

  const handleAddLecturer = (value: LectureType) => {
    console.log(value);
    onClose(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAddLecturer)} className=' space-y-6'>
        <FormField
          name='hoTenGV'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex  gap-x-5'>
                  <FormLabel className='text-right w-[100px] font-medium text-gray-700'>
                    Họ và tên{' '}
                  </FormLabel>
                  <Input
                    className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                    {...field}
                    placeholder='vd : Nguyễn Văn A'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='maGiangVien'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex gap-x-5'>
                  <FormLabel className='text-right w-[100px] font-medium text-gray-700'>
                    Mã giảng viên
                  </FormLabel>
                  <Input
                    className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                    {...field}
                    placeholder='vd : GV001'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='chucDanh'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex gap-x-5'>
                  <FormLabel className='text-right w-[100px] font-medium text-gray-700'>
                    Chức danh
                  </FormLabel>
                  <Input
                    className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                    {...field}
                    placeholder='vd : Giảng viên'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='namPhong'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex gap-x-5'>
                  <FormLabel className='text-right w-[100px] font-medium text-gray-700'>
                    Năm phong
                  </FormLabel>
                  <Input
                    className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                    {...field}
                    placeholder='vd : 2020'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='trinhDo'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex gap-x-5'>
                  <FormLabel className='text-right w-[100px] font-medium text-gray-700'>
                    Trình độ
                  </FormLabel>
                  <Input
                    className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                    {...field}
                    placeholder='vd : Tiến sĩ'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='nuoc'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex gap-x-5'>
                  <FormLabel className='text-right w-[100px] font-medium text-gray-700'>
                    Nước
                  </FormLabel>
                  <Input
                    className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                    {...field}
                    placeholder='vd : Việt Nam'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='namTotNghiep'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex gap-x-5'>
                  <FormLabel className='text-nowrap w-[100px] font-medium text-gray-700'>
                    Năm tốt nghiệp
                  </FormLabel>
                  <Input
                    className='flex-1 rounded-lg border-gray-200 focus:ring-blue-400'
                    {...field}
                    placeholder='vd : 2018'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 block ml-auto hover:to-indigo-800 rounded-lg'>
          Thêm Giảng Viên
        </Button>
      </form>
    </Form>
  );
}
