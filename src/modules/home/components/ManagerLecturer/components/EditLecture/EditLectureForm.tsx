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
import { useAddTeacherMutation } from '../mutations';

type LectureType = {
  maGiangVien: string;
  tenGiangVien: string;
  chucDanh: string;
  namPhong: string;
  trinhDo: string;
  nuoc: string;
  namTotNghiep: string;
};

export default function AddLectuerForm({
  lecture,
  onClose,
}: {
  onClose: () => void;
  lecture?: LectureType; // lecture có thể không có giá trị nên mình thêm `?`
}) {
  // Thiết lập giá trị mặc định từ prop lecture, nếu không có thì là chuỗi rỗng
  const form = useForm<LectureType>({
    defaultValues: {
      maGiangVien: lecture?.maGiangVien || '',
      tenGiangVien: lecture?.tenGiangVien || '',
      chucDanh: lecture?.chucDanh || '',
      namPhong: lecture?.namPhong || '',
      trinhDo: lecture?.trinhDo || '',
      nuoc: lecture?.nuoc || '',
      namTotNghiep: lecture?.namTotNghiep || '',
    },
  });

  const { mutate } = useAddTeacherMutation();

  const handleAddLecturer = (value: LectureType) => {
    console.log('Dữ liệu gửi lên:', JSON.stringify(value, null, 2)); // Log lại để kiểm tra
    mutate(value);
    onClose(); // Đóng form sau khi submit
  };

  const fields = [
    { name: 'tenGiangVien', label: 'Họ và tên', placeholder: 'vd : Nguyễn Văn A' },
    { name: 'maGiangVien', label: 'Mã giảng viên', placeholder: 'vd : GV001' },
    { name: 'chucDanh', label: 'Chức danh', placeholder: 'vd : Giảng viên' },
    { name: 'namPhong', label: 'Năm phong', placeholder: 'vd : 2020' },
    { name: 'trinhDo', label: 'Trình độ', placeholder: 'vd : Tiến sĩ' },
    { name: 'nuoc', label: 'Nước', placeholder: 'vd : Việt Nam' },
    { name: 'namTotNghiep', label: 'Năm tốt nghiệp', placeholder: 'vd : 2018' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAddLecturer)} className='space-y-5'>
        {fields.map((field) => (
          <FormField
            key={field.name}
            name={field.name as keyof LectureType}
            control={form.control}
            render={({ field: inputField }) => (
              <FormItem>
                <FormControl>
                  <div className='flex gap-x-5 items-center'>
                    <FormLabel className='w-[120px] font-medium text-gray-700'>
                      {field.label}
                    </FormLabel>
                    <Input
                      className='flex-1 rounded-md border-gray-300 focus:ring-indigo-500'
                      {...inputField}
                      placeholder={field.placeholder}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type='submit'
          className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 block ml-auto rounded-lg'
        >
          Thêm Giảng Viên
        </Button>
      </form>
    </Form>
  );
}
