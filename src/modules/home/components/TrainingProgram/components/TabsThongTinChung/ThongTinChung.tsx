import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';

export default function ThongTinChung() {
  return (
    <TabsContent value='general'>
      <Card className='border-gray-200 shadow-sm'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-gray-800'>Thông tin chung</CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Program Name */}
          <div>
            <Label className='block text-sm font-medium text-gray-700'>Tên chương trình:</Label>
            <Input
              type='text'
              className='mt-1 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900'
              defaultValue='Ghị chu cạc Cao đẳng Đại Học Thạc sĩ'
            />
          </div>

          {/* Level and Duration */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label className='block text-sm font-medium text-gray-700'>Bậc:</Label>
              <div className='relative'>
                <select className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white appearance-none'>
                  <option value='cao-dang'>Cao đẳng</option>
                  <option value='dai-hoc'>Đại học</option>
                  <option value='thac-si'>Thạc sĩ</option>
                </select>
                <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
              </div>
            </div>
            <div>
              <Label className='block text-sm font-medium text-gray-700'>Thời gian:</Label>
              <Input
                type='text'
                className='mt-1 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900'
                defaultValue='4.5 năm'
              />
            </div>
          </div>

          {/* Additional Info Grid */}
          <div className='grid grid-cols-4 gap-4'>
            <div>
              <Label className='block text-sm font-medium text-gray-700'>Loại bằng:</Label>
              <div className='relative'>
                <select className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white appearance-none'>
                  <option value='ky-su'>Kỹ sư</option>
                </select>
                <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
              </div>
            </div>
            <div>
              <Label className='block text-sm font-medium text-gray-700'>Số tín:</Label>
              <Input
                type='text'
                className='mt-1 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900'
                defaultValue='155'
              />
            </div>
            <div>
              <Label className='block text-sm font-medium text-gray-700'>Khoa quản lý:</Label>
              <Input
                type='text'
                className='mt-1 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900'
                defaultValue='CNTT'
              />
            </div>
            <div>
              <Label className='block text-sm font-medium text-gray-700'>Ngôn ngữ:</Label>
              <div className='relative'>
                <select className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white appearance-none'>
                  <option value='tieng-viet'>Tiếng Việt</option>
                  <option value='tieng-anh'>Tiếng Anh</option>
                </select>
                <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
              </div>
            </div>
          </div>

          {/* Training Type and Year */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label className='block text-sm font-medium text-gray-700'>Loại hình đào tạo:</Label>
              <div className='relative'>
                <select className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white appearance-none'>
                  <option value='chinh-quy'>Chính quy</option>
                </select>
                <ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none' />
              </div>
            </div>
            <div>
              <Label className='block text-sm font-medium text-gray-700'>Năm:</Label>
              <div className='mt-2 flex space-x-4'>
                {[2023, 2024, 2025, 2026].map((year) => (
                  <div key={year} className='flex items-center'>
                    <input
                      type='checkbox'
                      defaultChecked={year === 2023}
                      className='mr-2 text-indigo-600 focus:ring-indigo-500'
                    />
                    <span className='text-gray-700'>{year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
