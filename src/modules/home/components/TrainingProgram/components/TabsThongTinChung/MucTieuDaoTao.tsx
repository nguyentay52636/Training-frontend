import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { toast } from 'react-toastify';
import { addDeCuongChiTietAPI } from '@/lib/apis/DeCuongChiTietApi';
import { getAllCourse } from '@/lib/apis/CourseApi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CourseType } from '@/lib/apis/types';

export default function MucTieuDaoTao() {
  const [mucTieu, setMucTieu] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourse();
        console.log('Fetched courses:', data); // Debug log
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          console.error('Invalid course data format:', data);
          setCourses([]);
          toast.error('Dữ liệu học phần không hợp lệ');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
        toast.error('Có lỗi xảy ra khi tải danh sách học phần');
      }
    };
    fetchCourses();
  }, []);

  const handleSave = async () => {
    if (!mucTieu.trim()) {
      toast.error('Vui lòng nhập nội dung đề cương chi tiết', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!selectedCourse) {
      toast.error('Vui lòng chọn học phần', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      setIsLoading(true);
      await addDeCuongChiTietAPI({
        mucTieu,
        idHocPhan: Number(selectedCourse),
      });
      toast.success('Thêm đề cương chi tiết thành công', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setMucTieu('');
      setSelectedCourse('');
    } catch (error) {
      console.error('Error adding de cuong chi tiet:', error);
      toast.error('Có lỗi xảy ra khi thêm đề cương chi tiết', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TabsContent value='objective'>
      <Card className='border-gray-200 shadow-sm'>
        <CardHeader>
          <div className='flex justify-between items-center mb-4'>
            <CardTitle className='text-2xl font-bold text-gray-800'>Đề cương chi tiết</CardTitle>
            <div className='space-x-2 flex'>
              <Button
                className='w-8 h-5 w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl shadow-lg px-8 py-4 flex items-center gap-3 transition-all duration-300 transform hover:scale-105 cursor-pointer'
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? 'Đang lưu...' : 'Lưu'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='mb-4'>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Chọn học phần' />
              </SelectTrigger>
              <SelectContent>
                {courses && courses.length > 0 ? (
                  courses
                    .map((course) => {
                      if (!course || !course.idHocPhan || !course.tenHP) {
                        console.error('Invalid course data:', course);
                        return null;
                      }
                      return (
                        <SelectItem key={course.idHocPhan} value={course.idHocPhan.toString()}>
                          {course.tenHP}
                        </SelectItem>
                      );
                    })
                    .filter(Boolean)
                ) : (
                  <SelectItem value='none' disabled>
                    Không có học phần nào
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <fieldset className='border border-gray-300 rounded-lg p-1'>
            <legend className='text-sm font-medium text-gray-700 px-2'>Mô tả</legend>
            <textarea
              value={mucTieu}
              onChange={(e) => setMucTieu(e.target.value)}
              className='w-full h-64 p-4 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 resize-none'
              placeholder='Nhập nội dung đề cương chi tiết tại đây...'
            />
          </fieldset>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
