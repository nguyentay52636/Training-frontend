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

  const { mutate } = useAddThongTinChungMutation();

  const handleThemChuongTrinh = (value: IThongTinChungDataType) => {
    mutate(value);
  };

  return (
    <Form {...form}>
      <form className=' space-y-4' onSubmit={form.handleSubmit(handleThemChuongTrinh)}>
        <FormField
          control={form.control}
          name='tenChuongTrinh'
          render={({ field }) => (
            <FormItem>
              <Label className='block text-sm font-medium text-gray-700'>Tên chương trình:</Label>
              <Input
                {...field}
                className='mt-1 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900'
                defaultValue='Ghị chu cạc Cao đẳng Đại Học Thạc sĩ'
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

        {/* Additional Info Grid */}
        <div className='grid grid-cols-4 gap-4'>
          <div>
            <Label className='block text-sm font-medium text-gray-700'>Loại bằng:</Label>
            <Select defaultValue='ky-su'>
              <SelectTrigger className='w-full mt-1 border border-gray-300 rounded-lg'>
                <SelectValue placeholder='Chọn loại bằng' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='ky-su'>Kỹ sư</SelectItem>
                {/* Nếu bạn có thêm option thì thêm ở đây */}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className='block text-sm font-medium text-gray-700'>Số tín:</Label>
            <input
              type='text'
              defaultValue='155'
              className='mt-1 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 px-3 py-2'
            />
          </div>

          <div>
            <Label className='block text-sm font-medium text-gray-700'>Khoa quản lý:</Label>
            <input
              type='text'
              defaultValue='CNTT'
              className='mt-1 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 px-3 py-2'
            />
          </div>

          <div>
            <Label className='block text-sm font-medium text-gray-700'>Ngôn ngữ:</Label>
            <Select defaultValue='tieng-viet'>
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

        {/* Training Type and Year */}
        <div className='grid grid-cols-2 gap-4 mt-6'>
          <div>
            <Label className='block text-sm font-medium text-gray-700'>Loại hình đào tạo:</Label>
            <Select defaultValue='chinh-quy'>
              <SelectTrigger className='w-full mt-1 border border-gray-300 rounded-lg'>
                <SelectValue placeholder='Chọn loại hình đào tạo' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='chinh-quy'>Chính quy</SelectItem>
                {/* Thêm option khác nếu cần */}
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
        <Button className='w-full'>Them</Button>
      </form>
    </Form>
  );
};
