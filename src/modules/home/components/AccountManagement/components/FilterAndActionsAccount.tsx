import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SetStateAction, useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import DialogAddAccount from './DialogAddAccount';

interface FilterAndActionsAccountProps {
  setSearchKeyword: React.Dispatch<SetStateAction<string>>;
  searchKeyword: string;
}

export default function FilterAndActionsAccount({
  searchKeyword,
  setSearchKeyword,
}: FilterAndActionsAccountProps) {
  const [searchValue, setSearchValue] = useState(searchKeyword);
  const debouncedValue = useDebounce<string>(searchValue, 500);

  useEffect(() => {
    setSearchKeyword(debouncedValue);
  }, [debouncedValue, setSearchKeyword]);

  return (
    <div className='flex items-center justify-between py-5 bg-white rounded-xl shadow-sm px-6 mb-6'>
      <div className='relative w-full max-w-md'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6' />
        <Input
          placeholder='Tìm kiếm tài khoản theo họ tên...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className='pl-10 rounded-full border-gray-200 text-xl h-12 focus:ring-blue-400 shadow-sm font-bold'
        />
      </div>

      <div className='flex items-center gap-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='rounded-full border-gray-200 text-gray-700 hover:bg-gray-100'
            >
              Cột hiển thị <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuCheckboxItem className='capitalize'>Mã tài khoản</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className='capitalize'>Họ tên</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className='capitalize'>Email</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem className='capitalize'>
              Số điện thoại
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogAddAccount />
      </div>
    </div>
  );
}
