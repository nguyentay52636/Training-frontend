

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface PaginationCourseProps {
    currentPage: number
    totalPages: number
    totalItems: number
    onPageChange: (page: number) => void
    onPageSizeChange?: (pageSize: number) => void
    pageSize?: number
}

export default function PaginationManagerKnowledge({
    currentPage,
    totalPages,
    totalItems,
    onPageChange,
    onPageSizeChange,
    pageSize = 10
}: PaginationCourseProps) {
    const pageSizeOptions = [5, 10, 20, 50];

    // Tạo mảng các số trang hiển thị
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5; // Số trang hiển thị tối đa
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Điều chỉnh startPage nếu endPage đã đạt giới hạn
        if (endPage === totalPages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    // Tính toán hiển thị thông tin phân trang
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(startItem + pageSize - 1, totalItems);

    // Xử lý thay đổi kích thước trang
    const handlePageSizeChange = (value: string) => {
        if (onPageSizeChange) {
            onPageSizeChange(Number(value));
        }
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between py-6 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-b-lg border-t border-blue-100">
            <div className="text-base text-gray-700 mb-4 lg:mb-0 font-medium">
                Hiển thị <span className="font-bold text-blue-700">{startItem}</span> đến{' '}
                <span className="font-bold text-blue-700">{endItem}</span> trong số{' '}
                <span className="font-bold text-blue-700">{totalItems}</span> học phần
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
                {onPageSizeChange && (
                    <div className="flex items-center mr-0 md:mr-6 mb-4 md:mb-0">
                        <span className="text-base text-gray-700 mr-3 font-medium">Hiển thị:</span>
                        <Select
                            value={String(pageSize)}
                            onValueChange={handlePageSizeChange}
                        >
                            <SelectTrigger className="h-10 w-[80px] bg-white border-blue-200 focus:ring-blue-500">
                                <SelectValue placeholder={pageSize} />
                            </SelectTrigger>
                            <SelectContent>
                                {pageSizeOptions.map((size) => (
                                    <SelectItem key={size} value={String(size)}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                <div className="flex items-center bg-white rounded-xl shadow-md border border-blue-200 overflow-hidden">
                    <Button
                        variant="ghost"
                        className="h-11 w-11 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50 disabled:opacity-50"
                        disabled={currentPage <= 1}
                        onClick={() => onPageChange(1)}
                        title="Trang đầu"
                    >
                        <ChevronsLeft className="h-5 w-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        className="h-11 w-11 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50 disabled:opacity-50"
                        disabled={currentPage <= 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        title="Trang trước"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <div className="border-l border-r px-1 hidden md:flex">
                        {getPageNumbers().map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "ghost"}
                                className={`h-11 w-11 rounded-full m-1 font-bold ${currentPage === page
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md"
                                    : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                                    }`}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>

                    <div className="border-l border-r px-4 flex md:hidden items-center text-base font-medium text-gray-700">
                        <span>Trang <span className="text-blue-700 font-bold">{currentPage}</span> / {totalPages}</span>
                    </div>

                    <Button
                        variant="ghost"
                        className="h-11 w-11 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50 disabled:opacity-50"
                        disabled={currentPage >= totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        title="Trang sau"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        className="h-11 w-11 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50 disabled:opacity-50"
                        disabled={currentPage >= totalPages}
                        onClick={() => onPageChange(totalPages)}
                        title="Trang cuối"
                    >
                        <ChevronsRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
