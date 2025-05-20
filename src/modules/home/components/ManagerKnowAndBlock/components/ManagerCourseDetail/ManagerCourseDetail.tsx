import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CourseType } from '@/lib/apis/types';
import TableManagerCourse from './components/TableManagerCourse/TableManagerCourse';
import DialogAddManagerCourse from './components/DialogAddManagerCourse';
import { Toaster } from 'sonner';
import { Select, SelectContent, SelectItem } from '@/components/ui/select';

export default function ManagerCourseDetail() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseType | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleAddClick = () => {
    setEditingCourse(null);
    setIsAddDialogOpen(true);
  };

  const handleEditClick = (course: CourseType) => {
    setEditingCourse(course);
    setIsAddDialogOpen(true);
  };

  const handleSuccessAdd = () => {
    // Will trigger refetch in TableManagerCourse
  };

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
  };

  return (
    <div className='container p-6 mx-auto'>
      <div className='mb-6 flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Quản lý học phần</h1>
        <Button
          onClick={handleAddClick}
          className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-lg px-4 py-2 flex items-center gap-2'
        >
          <Plus className='h-5 w-5' />
          Thêm học phần mới
        </Button>
      </div>

      <div className='mb-4'>
        <Select value={selectedFilter} onValueChange={handleFilterChange}>
          <SelectContent>
            <SelectItem value='all'>Tất cả</SelectItem>
            <SelectItem value='0'>Bắt buộc</SelectItem>
            <SelectItem value='1'>Tự chọn</SelectItem>
            <SelectItem value='2'>Thực tập</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TableManagerCourse onEdit={handleEditClick} />

      <DialogAddManagerCourse
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        editingCourse={editingCourse}
        onSuccess={handleSuccessAdd}
      />

      <Toaster position='top-right' richColors />
    </div>
  );
}
