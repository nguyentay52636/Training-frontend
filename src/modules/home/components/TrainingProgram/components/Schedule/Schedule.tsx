import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DiaLogAddSchedule from './DialogAddSchedule';
import {
  useGetAllHocKy,
  useGetAllKeHoachDayHOcQuery,
  useGetAllTeachingPlanByStudySectionId,
} from './querys';
import ExportKeHoachDayHoc from './Excel/ExportKeHoachDayHoc';
import ImportKeHoachDayHoc from './Excel/ImportKeHoachDayHoc';
import { toast } from 'react-toastify';
import MajorTable from './MajorTable';

import { cn } from '@/lib/utils';
import { useDeleteChuyenNganh } from './mutation';

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

export default function Schedule() {
  const { data: dataChuyenNganh } = useGetAllKeHoachDayHOcQuery();
  const { data: dataHocKy } = useGetAllHocKy();
  const { mutate } = useDeleteChuyenNganh();
  if (!dataChuyenNganh || !dataHocKy) return null;

  return (
    <TabsContent value='schedule'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-3xl'>Kế hoạch dạy học</h1>
        <Button className='bg-indigo-700 rounded-xl'>Lưu</Button>
      </div>

      <Separator />

      <div>
        <h1 className='text-xl'>Tên chuyên ngành</h1>
      </div>

      <Accordion type='single' collapsible className='w-full mt-8'>
        {dataChuyenNganh?.map(({ tenChuyenNganh, idChuyenNganh }) => (
          <AccordionItem className='mb-5 w-full' key={idChuyenNganh} value={tenChuyenNganh}>
            <AccordionTrigger>
              <div className='cursor-pointer font-bold w-full p-3 hover:bg-gray-100 transition-colors duration-300 rounded-xl bg-secondary'>
                <h1>{tenChuyenNganh}</h1>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex gap-x-2'>
                  <ExportKeHoachDayHoc data={[major]} tenChuyenNganh={tenChuyenNganh} />
                  <ImportKeHoachDayHoc
                    onImport={(data) => {
                      console.log('Imported data:', data);
                      toast.success('Dữ liệu đã được nhập thành công!');
                    }}
                  />
                </div>
                <div>
                  <Button onClick={() => mutate(idChuyenNganh)} variant='destructive'>
                    Xoá chuyen ngành
                  </Button>
                </div>
              </div>
              <HocKyTable idHocPhan={idChuyenNganh} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <DiaLogAddSchedule />
    </TabsContent>
  );
}

const HocKyTable = ({ idHocPhan }: { idHocPhan: number }) => {
  const { data: dataHocKy } = useGetAllTeachingPlanByStudySectionId({
    studySectionId: idHocPhan,
  });

  return (
    <Tabs defaultValue='hocky-1'>
      <TabsList className='mb-4'>
        {dataHocKy?.hocKyList.map((_, i) => (
          <TabsTrigger
            key={`tab-${i}`}
            value={`hocky-${i + 1}`}
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
            {'Học kỳ ' + (i + 1)}
          </TabsTrigger>
        ))}
      </TabsList>
      {dataHocKy &&
        dataHocKy.hocKyList.map((monhoc, i) => (
          <TabsContent key={`hocky-${i + 1}`} value={`hocky-${i + 1}`}>
            <MajorTable major={monhoc} />
          </TabsContent>
        ))}
    </Tabs>
  );
};
