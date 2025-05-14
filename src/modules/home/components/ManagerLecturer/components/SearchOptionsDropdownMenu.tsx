import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const searchOptions = [
  { key: 'maGiangVien', label: 'Mã Giảng Viên' },
  { key: 'tenGiangVien', label: 'Tên Giảng Viên' },
  { key: 'chucDanh', label: 'Chức Danh' },
  { key: 'namPhong', label: 'Năm Phong' },
  { key: 'trinhDo', label: 'Trình Độ' },
  { key: 'nuoc', label: 'Nước' },
  { key: 'namTotNghiep', label: 'Năm Tốt Nghiệp' },
];

export default function SearchOptionsDropdownMenu({ selectedOption, onChange }: {
  selectedOption: string;
  onChange: (option: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = searchOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex items-center gap-4'>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            className='rounded-full border-gray-200 text-gray-700 hover:bg-gray-100'
          >
            {selectedOption ? searchOptions.find(opt => opt.key === selectedOption)?.label : 'Tìm kiếm theo'} 
            <ChevronDown className='ml-2 h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='p-2 min-w-[200px]'>
          <div className='flex items-center gap-2 px-2 pb-2'>
            <Search className='h-4 w-4 text-gray-500' />
            <Input
              placeholder='Tìm kiếm...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='h-8'
            />
          </div>
          <div className='max-h-[200px] overflow-y-auto'>
            {filteredOptions.map(option => (
              <div
                key={option.key}
                className='flex items-center gap-2 py-1 px-2 hover:bg-gray-100 cursor-pointer rounded-sm'
                onClick={() => {
                  onChange(option.key);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
              >
                <span className='text-sm'>{option.label}</span>
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {selectedOption && (
        <Input
          placeholder={`Tìm kiếm theo ${searchOptions.find(opt => opt.key === selectedOption)?.label}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='h-8'
        />
      )}
    </div>
  );
}
