import { Search, Filter, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

interface FilterAndSearchProps {
    onSearch: (keyword: string) => void;
    onColumnToggle: (columns: string[]) => void;
    onRefresh: () => void;
}

// Định nghĩa các cột có thể hiển thị
const availableColumns = [
    { id: 'id', label: 'ID' },
    { id: 'tenChuongTrinh', label: 'Tên chương trình' },
    { id: 'bac', label: 'Bậc' },
    { id: 'loaiBang', label: 'Loại bằng' },
    { id: 'loaiHinhDaoTao', label: 'Loại hình đào tạo' },
    { id: 'thoiGian', label: 'Thời gian' },
    { id: 'soTinChi', label: 'Số tín chỉ' },
    { id: 'khoaQuanLy', label: 'Khoa quản lý' },
    { id: 'ngonNgu', label: 'Ngôn ngữ' },
    { id: 'khoaTuyen', label: 'Khóa tuyển' },
    { id: 'actions', label: 'Hành động' },
];

export default function FilterAndSearch({ onSearch, onColumnToggle, onRefresh }: FilterAndSearchProps) {
    const [searchValue, setSearchValue] = useState('');
    const [selectedColumns, setSelectedColumns] = useState<string[]>(
        availableColumns.map(col => col.id)
    );
    const debouncedValue = useDebounce<string>(searchValue, 500);

    useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);

    const handleColumnToggle = (columnId: string) => {
        const newSelectedColumns = selectedColumns.includes(columnId)
            ? selectedColumns.filter(id => id !== columnId)
            : [...selectedColumns, columnId];

        setSelectedColumns(newSelectedColumns);
        onColumnToggle(newSelectedColumns);
    };

    return (
        <Card className='mb-6 border-gray-200'>
            <CardContent className='p-4'>
                <div className='flex items-center gap-4'>
                    {/* Ô tìm kiếm */}
                    <div className='relative flex-1'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                        <Input
                            type='text'
                            placeholder='Tìm kiếm theo tất cả các trường...'
                            value={searchValue}
                            className='pl-10 border-gray-300 focus:border-blue-600 focus:ring-blue-600'
                        />
                    </div>

                    {/* Dropdown chọn cột hiển thị */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='outline'
                                className='rounded-full border-gray-200 text-gray-700 hover:bg-gray-100'
                            >
                                Cột hiển thị <ChevronDown className='ml-2 h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className='w-56'>
                            {availableColumns.map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    checked={selectedColumns.includes(column.id)}
                                    onCheckedChange={() => handleColumnToggle(column.id)}
                                    className='capitalize'
                                >
                                    {column.label}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        variant='outline'
                        className='gap-2 border-gray-300 hover:bg-gray-100 hover:text-gray-900'
                        onClick={onRefresh}
                    >
                        <RefreshCw className='w-5 h-5' />
                        Làm mới
                    </Button>

                    <Button className='gap-2 bg-blue-600 hover:bg-blue-700 text-white'>
                        <Filter className='w-5 h-5' />
                        Lọc
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
} 