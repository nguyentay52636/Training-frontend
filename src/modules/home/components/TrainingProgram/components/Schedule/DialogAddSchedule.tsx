import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { dataHocPhan, HocPhan } from './dataHocPhanTest';

export default function DiaLogAddSchedule() {
  const [selectedMaHP, setSelectedMaHP] = useState<string | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<HocPhan[]>([]);

  // Handle adding course immediately when selected
  const handleSelectCourse = (value: string) => {
    const hocPhan = dataHocPhan.find((hp) => hp.maHP === value);
    if (hocPhan && !selectedCourses.some((course) => course.maHP === hocPhan.maHP)) {
      setSelectedCourses([...selectedCourses, hocPhan]);
      setSelectedMaHP(null); // Reset the course selection
    } else {
      console.log('Học phần đã được chọn trước đó!');
    }
  };

  const handleRemoveCourse = (maHP: string) => {
    setSelectedCourses(selectedCourses.filter((course) => course.maHP !== maHP));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-indigo-700 rounded-xl block ml-auto cursor-pointer'>
          Thêm học phần
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle className='text-[1.8rem]'>Thêm học phần</DialogTitle>
        </DialogHeader>

        <Select onValueChange={(value) => handleSelectCourse(value)}>
          <SelectTrigger className='w-full mt-4 h-12 text-[1.1rem] text-black'>
            <SelectValue placeholder='Chọn học phần' />
          </SelectTrigger>
          <SelectContent>
            {dataHocPhan.map((hocPhan) => (
              <SelectItem key={hocPhan.maHP} value={hocPhan.maHP}>
                {hocPhan.tenHP} ({hocPhan.maHP})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Course Section */}
        {selectedCourses.length > 0 && (
          <div className='mt-6'>
            <h3 className='text-lg font-semibold mb-2'>Học phần đã chọn:</h3>
            <div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
              {selectedCourses.map((course, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between bg-gray-100 p-2 rounded-md'
                >
                  <span>
                    {course.maHP} - {course.tenHP} - {course.soTinChi} tín chỉ
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-black text-white text-[18px] hover:bg-black hover:text-white cursor-pointer hover:bg-shadow-xl'
                    onClick={() => handleRemoveCourse(course.maHP)}
                  >
                    x
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className='flex justify-end mt-4'>
          <Button
            onClick={() => console.log(selectedCourses[0])}
            variant='default'
            className='cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          >
            Lưu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
