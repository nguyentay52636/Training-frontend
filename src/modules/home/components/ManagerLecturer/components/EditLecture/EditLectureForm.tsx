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
import { LectureType } from '@/lib/apis/types';
import { updateLectureAPI } from '@/lib/apis/lectureApi';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

interface EditLectureFormProps {
  lecture: LectureType;
  onClose: (isOpen: boolean) => void;
}

export default function EditLectureForm({ lecture, onClose }: EditLectureFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<LectureType>({
    defaultValues: {
      maGiangVien: lecture.maGiangVien,
      tenGiangVien: lecture.tenGiangVien,
      chucDanh: lecture.chucDanh,
      namPhong: lecture.namPhong,
      trinhDo: lecture.trinhDo,
      nuoc: lecture.nuoc,
      namTotNghiep: lecture.namTotNghiep,
    },
  });

  const handleUpdateLecturer = async (values: LectureType) => {
    try {
      if (!lecture.idGiangVien) {
        throw new Error('Không tìm thấy ID giảng viên');
      }

      // Optimistically update the cache
      queryClient.setQueryData(['teachers'], (oldData: LectureType[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map((item) =>
          item.idGiangVien === lecture.idGiangVien
            ? { ...item, ...values }
            : item
        );
      });

      // Call the API to update
      const updatedData = await updateLectureAPI(lecture.idGiangVien, values);
      
      // Update the cache with the server response
      queryClient.setQueryData(['teachers'], (oldData: LectureType[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map((item) =>
          item.idGiangVien === lecture.idGiangVien
            ? { ...item, ...updatedData }
            : item
        );
      });

      // Show success message
      toast.success('Cập nhật giảng viên thành công!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Close the form after a short delay
      setTimeout(() => {
        onClose(false);
      }, 500);

    } catch (error) {
      // Revert optimistic update on error
      queryClient.invalidateQueries({ queryKey: ['teachers'] });
      
      console.error('Error updating lecturer:', error);
      toast.error('Có lỗi xảy ra khi cập nhật giảng viên!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Đặt lại biến fields ở đây
  const fields = [
    { name: 'maGiangVien', label: 'Mã giảng viên', placeholder: 'vd : GV001' },
    { name: 'tenGiangVien', label: 'Họ và tên', placeholder: 'vd : Nguyễn Văn A' },
    { name: 'chucDanh', label: 'Chức danh', placeholder: 'vd : Giảng viên' },
    { name: 'namPhong', label: 'Năm phong', placeholder: 'vd : 2020' },
    { name: 'trinhDo', label: 'Trình độ', placeholder: 'vd : Tiến sĩ' },
    { name: 'nuoc', label: 'Nước', placeholder: 'vd : Việt Nam' },
    { name: 'namTotNghiep', label: 'Năm tốt nghiệp', placeholder: 'vd : 2018' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateLecturer)} className='space-y-5'>
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

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onClose(false)}
            className="border-gray-300 hover:bg-gray-50"
          >
            Hủy
          </Button>
          <Button
            type='submit'
            className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
          >
            Cập nhật
          </Button>
        </div>
      </form>
    </Form>
  );
}
