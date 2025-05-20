import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export default function TabNavigation() {
    return (
        <div className='flex justify-center'>
            <TabsList className='flex justify-center gap-4 mb-6 border-b border-gray-200 p-0'>
                <TabsTrigger
                    value='general'
                    className={cn(
                        'pb-2 relative text-xl mx-6',
                        'data-[state=active]:text-indigo-600 data-[state=active]:font-semibold',
                        'data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-indigo-600 data-[state=inactive]:transition-all',
                        'cursor-pointer hover:scale-105 transition-transform duration-200',
                        'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600',
                        'after:opacity-0 after:transition-opacity after:duration-300',
                        'data-[state=active]:after:opacity-100',
                    )}
                >
                    1. Thông tin chung
                </TabsTrigger>

                <TabsTrigger
                    value='objective'
                    className={cn(
                        'pb-2 relative text-xl mx-6',
                        'data-[state=active]:text-indigo-600 data-[state=active]:font-semibold',
                        'data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-indigo-600 data-[state=inactive]:transition-all',
                        'cursor-pointer hover:scale-105 transition-transform duration-200',
                        'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600',
                        'after:opacity-0 after:transition-opacity after:duration-300',
                        'data-[state=active]:after:opacity-100',
                    )}
                >
                    2. Đề cương chi tiết
                </TabsTrigger>

                <TabsTrigger
                    value='curriculum'
                    className={cn(
                        'pb-2 relative text-xl mx-6',
                        'data-[state=active]:text-indigo-600 data-[state=active]:font-semibold',
                        'data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-indigo-600 data-[state=inactive]:transition-all',
                        'cursor-pointer hover:scale-105 transition-transform duration-200',
                        'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600',
                        'after:opacity-0 after:transition-opacity after:duration-300',
                        'data-[state=active]:after:opacity-100',
                    )}
                >
                    3. Nội dung chương trình
                </TabsTrigger>

                <TabsTrigger
                    value='schedule'
                    className={cn(
                        'pb-2 relative text-xl mx-6',
                        'data-[state=active]:text-indigo-600 data-[state=active]:font-semibold',
                        'data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-indigo-600 data-[state=inactive]:transition-all',
                        'cursor-pointer hover:scale-105 transition-transform duration-200',
                        'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600',
                        'after:opacity-0 after:transition-opacity after:duration-300',
                        'data-[state=active]:after:opacity-100',
                    )}
                >
                    4. Kế hoạch dạy học
                </TabsTrigger>
            </TabsList>
        </div>
    );
} 