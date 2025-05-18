import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CourseType } from '@/lib/apis/types';
import TableManagerCourse from './components/TableManagerCourse/TableManagerCourse';
import DialogAddManagerCourse from './components/DialogAddManagerCourse';
import { Toaster } from 'sonner';

export default function ManagerCourseDetail() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseType | null>(null);

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
