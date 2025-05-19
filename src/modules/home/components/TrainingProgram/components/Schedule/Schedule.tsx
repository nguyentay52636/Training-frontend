import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import MajorTable from './MajorTable';
import { cn } from '@/lib/utils';

import DiaLogAddSchedule from './DialogAddSchedule';
import { useGetAllHocKy, useGetAllKeHoachDayHOcQuery } from './querys';
import ExportKeHoachDayHoc from './Excel/ExportKeHoachDayHoc';
import ImportKeHoachDayHoc from './Excel/ImportKeHoachDayHoc';
import { toast } from 'react-toastify';

const major = {
  idHocPhan: 1,
  maHP: 'HP001',
  tenHP: 'Toán rời rạc',
  soTinChi: 3,
  soTietLyThuyet: 30,
  soTietThucHanh: 15,
  soTietThucTap: 0,
  tongSoTiet: 45,
  loaiHocPhan: 0,
  heSoHocPhan: 1,
};

const danhsachHocKy = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Schedule() {
  const { data } = useGetAllKeHoachDayHOcQuery();
  const { data: dataHocKy } = useGetAllHocKy();

  return (
    data &&
    dataHocKy && (
      <TabsContent value='schedule'>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-3xl'>Kế hoạch dạy học</h1>
          <Button className='bg-indigo-700  rounded-xl'>Lưu</Button>
        </div>

        <Separator />

        <div>
          <h1 className='text-xl'>Tên chuyên ngành</h1>
        </div>

        <Accordion type='single' collapsible className='w-full mt-8'>
          {data.map(({ tenChuyenNganh }) => (
            <AccordionItem
              className='mb-5 w-full'
              key={new Date().getTime()}
              value={tenChuyenNganh}
            >
              <AccordionTrigger>
                <div className='cursor-pointer font-bold w-full p-3 hover:bg-gray-100 transition-colors duration-300 rounded-xl bg-secondary'>
                  <h1>{tenChuyenNganh}</h1>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className='flex items-center justify-between mb-4'>
                  {/* <div className='flex gap-x-2'>
                    <Button className='bg-indigo-700  rounded-xl'>Thêm học phần</Button>
                    <Button className='bg-indigo-700  rounded-xl'>Xóa học phần</Button>
                  </div> */}
                  <div className='flex gap-x-2'>
                    <ExportKeHoachDayHoc
                      data={[major]}
                      tenChuyenNganh={tenChuyenNganh}
                    />
                    <ImportKeHoachDayHoc
                      onImport={(data) => {
                        console.log('Imported data:', data);
                        // Handle the imported data here
                        toast.success('Dữ liệu đã được nhập thành công!');
                      }}
                    />
                  </div>
                </div>
                <Tabs defaultValue='hocky-1'>
                  <TabsList className='mb-4'>
                    {dataHocKy.map(({ idHocPhan, idHocKy }) => (
                      <TabsTrigger

                        value={`hocky-${idHocKy}`}
                        className={cn(
                          'pb-2 relative text-xl mx-6',
                          'data-[state=active]:text-indigo-600 data-[state=active]:font-semibold',
                          'data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-indigo-600 data-[state=inactive]:transition-all',
                          'cursor-pointer hover:scale-105 transition-transform duration-200',
                          'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600',
                          'after:opacity-0 after:transition-opacity after:duration-300',
                          'data-[state=active]:after:opacity-100',
                        )}
                      >
                        {'Học kỳ ' + idHocKy}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {danhsachHocKy.map((num) => (
                    <TabsContent key={`hocky-${num}`} value={`hocky-${num}`}>
                      <MajorTable major={major} />
                    </TabsContent>
                  ))}
                </Tabs>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <DiaLogAddSchedule />
      </TabsContent>
    )
  );
}
