import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { PhanCongGiangDayType } from '@/lib/apis/types';
import { useEditPhanCongGiangDayMutation } from './mutations';

interface FormValues {
  idGiangVien: number;
  idHocPhan: number;
  hocKy: number;
  tenMonHoc: string;
  soTietThucHien: number;
  soTietThucTe: number;
}

export default function EditScheduleDialog({
  scheduleData,
}: {
  scheduleData: PhanCongGiangDayType;
}) {
  const { mutate } = useEditPhanCongGiangDayMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      idGiangVien: scheduleData.idGiangVien,
      idHocPhan: scheduleData.idHocPhan,
      hocKy: scheduleData.hocKy,
      tenMonHoc: scheduleData.tenMonHoc,
      soTietThucHien: scheduleData.soTietThucHien,
      soTietThucTe: scheduleData.soTietThucTe,
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate({
      id: data.idHocPhan,
      data,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                name='idGiangVien'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Giảng Viên</FormLabel>
                    <FormControl>
                      <Input {...field} type='number' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='idHocPhan'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Học Phần</FormLabel>
                    <FormControl>
                      <Input {...field} type='number' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='hocKy'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Học Kỳ</FormLabel>
                    <FormControl>
                      <Input {...field} type='number' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='tenMonHoc'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên Môn Học</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='soTietThucHien'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số Tiết Thực Hiện</FormLabel>
                    <FormControl>
                      <Input {...field} type='number' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='soTietThucTe'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số Tiết Thực Tế</FormLabel>
                    <FormControl>
                      <Input {...field} type='number' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button>Lưu Thay Đổi</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
