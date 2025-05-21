import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
import { Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAddThongTinChungMutation } from '../TrainingProgram/components/mutations';
import { toast } from 'sonner';

export default function EditThongTinChungDialog({
  dataThongTinChung,
}: {
  dataThongTinChung: IThongTinChungDataType;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Pencil className='w-4 h-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-3xl w-3xl min-w-3xl '>
        <EditThongTinChungForm thongTinChung={dataThongTinChung} />
      </DialogContent>
    </Dialog>
  );
}

const EditThongTinChungForm = ({ thongTinChung }: { thongTinChung: IThongTinChungDataType }) => {
  const years = [2020, 2021, 2022, 2023];
  const form = useForm<IThongTinChungDataType>({
    defaultValues: {
      tenChuongTrinh: thongTinChung.tenChuongTrinh,
      bac: thongTinChung.bac,
      loaiBang: thongTinChung.loaiBang,
      loaiHinhDaoTao: thongTinChung.loaiHinhDaoTao,
      thoiGian: thongTinChung.thoiGian,
      soTinChi: thongTinChung.soTinChi,
      khoaQuanLy: thongTinChung.khoaQuanLy,
      ngonNgu: thongTinChung.ngonNgu,
      khoaTuyen: thongTinChung.khoaTuyen,
    },
  });

  const { mutate, isPending } = useAddThongTinChungMutation();

  const handleThemChuongTrinh = (value: IThongTinChungDataType) => {
    mutate(value, {
      onSuccess: () => {
        toast.success('Thêm thông tin chung thành công');
      },
      onError: () => {
        toast.error('Có lỗi xảy ra khi thêm thông tin chung');
      }
    });
  };

  return (
    <Form {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(handleThemChuongTrinh)}>
        <FormField
          control={form.control}
          name='tenChuongTrinh'
          render={({ field }) => (
            <FormItem>
              <Label className='block text-sm font-medium text-gray-700'>Tên chương trình:</Label>
              <Input
                {...field}
                className='mt-1 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 text-gray-900'
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bac'
          render={({ field }) => (
            <FormItem>
              <Label className='block text-sm font-medium text-gray-700'>Bậc:</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className='w-full mt-1 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700'>
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

        <div className='grid grid-cols-4 gap-4'>
          <div>
            <Label className='block text-sm font-medium text-gray-700'>Loại bằng:</Label>
            <Select defaultValue='ky-su'>
              <SelectTrigger className='w-full mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700'>
                <SelectValue placeholder='Chọn loại bằng' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='ky-su'>Kỹ sư</SelectItem>
                <SelectItem value='cu-nhan'>Cử nhân</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className='block text-sm font-medium text-gray-700'>Số tín chỉ:</Label>
            <input
              type='text'
              defaultValue='155'
              className='mt-1 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 text-gray-900 px-3 py-2'
            />
          </div>

          <div>
            <Label className='block text-sm font-medium text-gray-700'>Khoa quản lý:</Label>
            <input
              type='text'
              defaultValue='CNTT'
              className='mt-1 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 text-gray-900 px-3 py-2'
            />
          </div>

          <div>
            <Label className='block text-sm font-medium text-gray-700'>Ngôn ngữ:</Label>
            <Select defaultValue='tieng-viet'>
              <SelectTrigger className='w-full mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700'>
                <SelectValue placeholder='Chọn ngôn ngữ' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='tieng-viet'>Tiếng Việt</SelectItem>
                <SelectItem value='tieng-anh'>Tiếng Anh</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 mt-6'>
          <div>
            <Label className='block text-sm font-medium text-gray-700'>Loại hình đào tạo:</Label>
            <Select defaultValue='chinh-quy'>
              <SelectTrigger className='w-full mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700'>
                <SelectValue placeholder='Chọn loại hình đào tạo' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='chinh-quy'>Chính quy</SelectItem>
                <SelectItem value='lien-thong'>Liên thông</SelectItem>
                <SelectItem value='tai-chuc'>Tại chức</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className='block text-sm font-medium text-gray-700'>Năm:</Label>
            <div className='mt-2 flex space-x-4'>
              {years.map((year) => (
                <div key={year} className='flex items-center'>
                  <Checkbox defaultChecked={year === 2023} id={`year-${year}`} className='mr-2' />
                  <label htmlFor={`year-${year}`} className='text-gray-700'>
                    {year}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button className='w-full mt-4 cursor-pointer bg-blue-800' disabled={isPending}>
          {isPending ? 'Đang xử lý...' : 'Sửa'}
        </Button>
      </form>
    </Form >
  );
};
