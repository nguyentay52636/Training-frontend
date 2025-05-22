import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IThongTinChungDataType } from '@/lib/apis/types';
import { useForm } from 'react-hook-form';
import { useAddThongTinChungMutation } from '../TrainingProgram/components/mutations';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export default function AddThongTinChungDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const handleCloseDialog = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
<<<<<<< HEAD
    <Dialog open={open} onOpenChange={handleCloseDialog}>
=======
    <Dialog>
      <DialogTrigger asChild>
        <Button className=' cursor-pointer bg-blue-800'>Thêm thông tin chung</Button>
      </DialogTrigger>
>>>>>>> 5d1f1e2245ba6402f53fc25438cbeca33823d71d
      <DialogContent className='max-w-3xl w-3xl min-w-3xl '>
        <AddThongTinChungForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

const AddThongTinChungForm = ({ onClose }: { onClose: () => void }) => {
  const years = [2020, 2021, 2022, 2023];

  const { mutate, isPending } = useAddThongTinChungMutation();

  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const form = useForm<IThongTinChungDataType>({
    defaultValues: {
      tenChuongTrinh: '',
      bac: '',
      loaiBang: '',
      loaiHinhDaoTao: '',
      thoiGian: setSelectedYears.length.toString(),
      soTinChi: 0,
      khoaQuanLy: '',
      ngonNgu: '',
      khoaTuyen: '',
    },
  });

  const handleYearChange = (year: number, checked: boolean) => {
    const updatedYears = checked
      ? [...selectedYears, year]
      : selectedYears.filter((y) => y !== year);

    setSelectedYears(updatedYears);
    form.setValue('thoiGian', updatedYears.length.toString());
  };

<<<<<<< HEAD
  const handleThemChuongTrinh = (value: IThongTinChungDataType) => {
    mutate(
      {
        ...value,
        thoiGian: selectedYears.length.toString(),
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };
=======
  const handleThemChuongTrinh = useCallback((value: IThongTinChungDataType) => {
    if (isSubmitting || isToastVisible) return;

    setIsSubmitting(true);
    mutate({
      ...value,
      thoiGian: selectedYears.length.toString(),
    }, {
      onSuccess: () => {
        setIsToastVisible(true);
        toast.success('Thêm thông tin chung thành công', {
          onDismiss: () => {
            setIsToastVisible(false);
            setIsSubmitting(false);
            form.reset();
            setSelectedYears([]);
          },
          duration: 2000,
        });
      },
      onError: () => {
        toast.error('Có lỗi xảy ra khi thêm thông tin chung', {
          onDismiss: () => {
            setIsToastVisible(false);
            setIsSubmitting(false);
          },
          duration: 2000,
        });
      }
    });
  }, [isSubmitting, isToastVisible, mutate, selectedYears.length, form]);
>>>>>>> 5d1f1e2245ba6402f53fc25438cbeca33823d71d

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(handleThemChuongTrinh)}>
        {/* Tên chương trình */}
        <FormField
          control={form.control}
          name='tenChuongTrinh'
          render={({ field }) => (
            <FormItem>
              <Label className='block text-sm font-medium text-gray-700'>Tên chương trình:</Label>
              <Input
                {...field}
                className='mt-1 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900'
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='khoaTuyen'
          render={({ field }) => (
            <FormItem>
              <Label className='block text-sm font-medium text-gray-700'>Khoa tuyển :</Label>
              <Input
                {...field}
                className='mt-1 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900'
              />
            </FormItem>
          )}
        />

        {/* Bậc */}
        <FormField
          control={form.control}
          name='bac'
          render={({ field }) => (
            <FormItem>
              <Label className='block text-sm font-medium text-gray-700'>Bậc:</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className='w-full mt-1 border-gray-300 rounded-lg'>
                  <SelectValue placeholder='Chọn bậc' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='cao-dang'>Cao đẳng</SelectItem>
                  <SelectItem value='dai-hoc'>Đại học</SelectItem>
                  <SelectItem value='thac-si'>Thạc sĩ</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Grid các trường thông tin khác */}
        <div className='grid grid-cols-4 gap-4'>
          {/* Loại bằng */}
          <div>
            <Label className='block text-sm font-medium text-gray-700'>Loại bằng:</Label>
            <Select onValueChange={(value) => form.setValue('loaiBang', value)}>
              <SelectTrigger className='w-full mt-1 border border-gray-300 rounded-lg'>
                <SelectValue placeholder='Chọn loại bằng' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='ky-su'>Kỹ sư</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Số tín chỉ */}
          <div>
            <Label className='block text-sm font-medium text-gray-700'>Số tín chỉ:</Label>
            <Input
              type='number'
              {...form.register('soTinChi', { valueAsNumber: true })}
              className='mt-1 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900'
            />
          </div>

          {/* Khoa quản lý */}
          <div>
            <Label className='block text-sm font-medium text-gray-700'>Khoa quản lý:</Label>
            <Input
              {...form.register('khoaQuanLy')}
              className='mt-1 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900'
            />
          </div>

          {/* Ngôn ngữ */}
          <div>
            <Label className='block text-sm font-medium text-gray-700'>Ngôn ngữ:</Label>
            <Select onValueChange={(value) => form.setValue('ngonNgu', value)}>
              <SelectTrigger className='w-full mt-1 border border-gray-300 rounded-lg'>
                <SelectValue placeholder='Chọn ngôn ngữ' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='tieng-viet'>Tiếng Việt</SelectItem>
                <SelectItem value='tieng-anh'>Tiếng Anh</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loại hình đào tạo và Năm */}
        <div className='grid grid-cols-2 gap-4 mt-6'>
          {/* Loại hình đào tạo */}
          <div>
            <Label className='block text-sm font-medium text-gray-700'>Loại hình đào tạo:</Label>
            <Select onValueChange={(value) => form.setValue('loaiHinhDaoTao', value)}>
              <SelectTrigger className='w-full mt-1 border border-gray-300 rounded-lg'>
                <SelectValue placeholder='Chọn loại hình đào tạo' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='chinh-quy'>Chính quy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Năm */}
          <div>
            <Label className='block text-sm font-medium text-gray-700'>Năm:</Label>
            <div className='mt-2 flex space-x-4'>
              {years.map((year) => (
                <div key={year} className='flex items-center'>
                  <Checkbox
                    checked={selectedYears.includes(year)}
                    onCheckedChange={(checked) => handleYearChange(year, Boolean(checked))}
                    id={`year-${year}`}
                    className='mr-2'
                  />
                  <label htmlFor={`year-${year}`} className='text-gray-700'>
                    {year}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <Button
          className='w-full mt-4 cursor-pointer bg-blue-800'
          type='submit'
          disabled={isPending || isSubmitting || isToastVisible}
        >
          {isPending || isSubmitting ? 'Đang xử lý...' : 'Thêm'}
        </Button>
      </form>
    </Form>
  );
};
