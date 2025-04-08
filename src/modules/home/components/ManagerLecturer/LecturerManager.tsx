import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import AddLecturerDialog from './components/AddLecturer/AddLecturerDialog';
import SearchOptionsDropdownMenu from './components/SearchOptionsDropdownMenu';
import LecturerTable from './components/LecturerTable';
import { Button } from '@/components/ui/button';

export default function LecturerManager() {
  return (
    <div>
      {/* Title */}
      <div className='mb-8 '>
        <h1 className='text-4xl font-bold text-blue-900 tracking-tight'>Quản Lý Giảng Viên</h1>
        <p className='text-sm text-gray-500 mt-2'>
          Quản lý thông tin giảng viên của SGU một cách hiệu quả và chuyên nghiệp
        </p>
      </div>

      <div className='flex items-center justify-between py-6 bg-white rounded-xl shadow-sm px-6 mb-6'>
        <div className='relative w-full max-w-md'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
          <Input
            placeholder='Tìm kiếm giảng viên theo họ tên...'
            className='pl-10 rounded-full border-gray-200 focus:ring-blue-400 shadow-sm'
          />
        </div>

        <div className=' flex gap-x-5'>
          <SearchOptionsDropdownMenu />
          <AddLecturerDialog />
        </div>
      </div>

      <LecturerTable />

      <div className='mx-auto gap-x-5 mt-8 flex justify-center'>
        <Button className='hover:bg-secondary' variant='outline'>
          back
        </Button>

        <Button className='bg-foreground text-background'>1</Button>
        <Button className='bg-background hover:text-white text-foreground'>2</Button>
        <Button className='bg-background hover:text-white text-foreground'>3</Button>
        <Button className='bg-background hover:text-white text-foreground'>4</Button>
        <Button className='bg-background hover:text-white text-foreground'>5</Button>

        <Button className='hover:bg-secondary' variant='outline'>
          Next
        </Button>
      </div>
    </div>
  );
}
