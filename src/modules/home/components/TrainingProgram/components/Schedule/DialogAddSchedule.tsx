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
import { useGetAllKeHoachDayHOcQuery } from './querys';
import { toast } from 'react-toastify';
import { useThemHocPhanVaoHocKy, useThemHocKyVaoChuyenNganh } from './mutation';

export default function DiaLogAddSchedule() {
  const [selectedMaHP, setSelectedMaHP] = useState<string | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<HocPhan[]>([]);
  const [selectedChuyenNganh, setSelectedChuyenNganh] = useState<string | null>(null);
  const [selectedHocKy, setSelectedHocKy] = useState<string | null>(null);
  const { data: dataChuyenNganh } = useGetAllKeHoachDayHOcQuery();
  const { mutate: themHocPhan, isPending: isAddingCourse } = useThemHocPhanVaoHocKy();
  const { mutate: themHocKy, isPending: isAddingSemester } = useThemHocKyVaoChuyenNganh();

  // Handle adding course immediately when selected
  const handleSelectCourse = (value: string) => {
    const hocPhan = dataHocPhan.find((hp) => hp.maHP === value);
    if (hocPhan && !selectedCourses.some((course) => course.maHP === hocPhan.maHP)) {
      setSelectedCourses([...selectedCourses, hocPhan]);
      setSelectedMaHP(null); // Reset the course selection
    } else {
      toast.warning('Học phần đã được chọn trước đó!');
    }
  };

  const handleRemoveCourse = (maHP: string) => {
    setSelectedCourses(selectedCourses.filter((course) => course.maHP !== maHP));
  };

  const handleAddSemester = async () => {
    if (!selectedChuyenNganh) {
      toast.error('Vui lòng chọn chuyên ngành!');
      return;
    }

    try {
      await themHocKy(parseInt(selectedChuyenNganh));
      toast.success('Thêm học kỳ vào chuyên ngành thành công!');
    } catch (error) {
      console.error('Error adding semester to major:', error);
      toast.error('Có lỗi xảy ra khi thêm học kỳ vào chuyên ngành!');
    }
  };

  const handleSave = async () => {
    if (!selectedChuyenNganh) {
      toast.error('Vui lòng chọn chuyên ngành!');
      return;
    }

    if (!selectedHocKy) {
      toast.error('Vui lòng chọn học kỳ!');
      return;
    }

    if (selectedCourses.length === 0) {
      toast.error('Vui lòng chọn ít nhất một học phần!');
      return;
    }

    try {
      // Add each selected course to the selected semester
      for (const course of selectedCourses) {
        await themHocPhan({
          idHocKy: parseInt(selectedHocKy),
          idHocPhan: parseInt(course.maHP)
        });
      }

      toast.success('Thêm học phần vào học kỳ thành công!');
      setSelectedCourses([]);
      setSelectedHocKy(null);
      setSelectedChuyenNganh(null);
    } catch (error) {
      console.error('Error adding courses to semester:', error);
      toast.error('Có lỗi xảy ra khi thêm học phần vào học kỳ!');
    }
  };

  // Get available semesters for selected major
  const getAvailableSemesters = () => {
    if (!selectedChuyenNganh || !dataChuyenNganh) return [];
    const chuyenNganh = dataChuyenNganh.find(
      (cn) => cn.idChuyenNganh.toString() === selectedChuyenNganh
    );
    return chuyenNganh?.hocKyList || [];
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

        <div className='space-y-4'>
          <div>
            <label className='text-sm font-medium mb-2 block'>Chọn chuyên ngành</label>
            <Select onValueChange={(value) => {
              setSelectedChuyenNganh(value);
              setSelectedHocKy(null); // Reset selected semester when major changes
            }}>
              <SelectTrigger className='w-full h-12 text-[1.1rem] text-black'>
                <SelectValue placeholder='Chọn chuyên ngành' />
              </SelectTrigger>
              <SelectContent>
                {dataChuyenNganh?.map((chuyenNganh) => (
                  <SelectItem key={chuyenNganh.idChuyenNganh} value={chuyenNganh.idChuyenNganh.toString()}>
                    {chuyenNganh.tenChuyenNganh}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center gap-4'>
            <div className='flex-1'>
              <label className='text-sm font-medium mb-2 block'>Chọn học kỳ</label>
              <Select
                onValueChange={(value) => setSelectedHocKy(value)}
                disabled={!selectedChuyenNganh}
              >
                <SelectTrigger className='w-full h-12 text-[1.1rem] text-black'>
                  <SelectValue placeholder='Chọn học kỳ' />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableSemesters().map((hocKy) => (
                    <SelectItem key={hocKy.idHocKy} value={hocKy.idHocKy.toString()}>
                      Học kỳ {hocKy.idHocKy}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleAddSemester}
              disabled={!selectedChuyenNganh || isAddingSemester}
              className='mt-6 bg-green-600 hover:bg-green-700'
            >
              {isAddingSemester ? 'Đang thêm...' : 'Thêm học kỳ'}
            </Button>
          </div>

          <div>
            <label className='text-sm font-medium mb-2 block'>Chọn học phần</label>
            <Select
              onValueChange={(value) => handleSelectCourse(value)}
              disabled={!selectedHocKy}
            >
              <SelectTrigger className='w-full h-12 text-[1.1rem] text-black'>
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
          </div>
        </div>

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
            onClick={handleSave}
            variant='default'
            className='cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
            disabled={isAddingCourse}
          >
            {isAddingCourse ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
