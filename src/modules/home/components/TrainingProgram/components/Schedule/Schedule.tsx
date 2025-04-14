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
import { ArrowDownToLine, ArrowUpToLine, Plus } from 'lucide-react';
import DiaLogAddSchedule from './DialogAddSchedule';


const majors = ['Kỹ thuật phần mềm'];

const major = {
    stt: 1,
    maHocPhan: 'INT1234',
    soTC: 3,
    lyThuyet: '30',
    thucHanh: '15',
    tenHocPhan: 'Giao duc quoc  phong',
};

const danhsachHocKy = [1, 2, 3, 4, 5];

export default function Schedule() {
    return (
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
                {majors.map((majorName) => (
                    <AccordionItem className='mb-5 w-full' key={majorName} value={majorName}>
                        <AccordionTrigger>
                            <div className='cursor-pointer font-bold w-full p-3 hover:bg-gray-100 transition-colors duration-300 rounded-xl bg-secondary'>
                                <h1>{majorName}</h1>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className='flex items-center justify-between mb-4'>
                                <div className='flex gap-x-2'>
                                    <Button className='bg-indigo-700  rounded-xl'>Thêm học phần</Button>
                                    <Button className='bg-indigo-700  rounded-xl'>Xóa học phần</Button>
                                </div>
                                <div className='flex gap-x-2'>
                                    <Button className='bg-green-700 rounded-xl cursor-pointer '> <ArrowDownToLine /> Xuất Excel</Button>
                                    <Button className='rounded-xl bg-green-700  cursor-pointer'>
                                        <ArrowUpToLine />
                                        Nhập Excel
                                    </Button>
                                </div>
                            </div>
                            <Tabs defaultValue='hocky-1'>
                                <TabsList className='mb-4'>
                                    {danhsachHocKy.map((num) => (
                                        <TabsTrigger
                                            key={num}
                                            value={`hocky-${num}`}
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
                                            {'Học kỳ ' + num}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                {danhsachHocKy.map((num) => (
                                    <TabsContent key={num} value={`hocky-${num}`}>
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
    );
}
