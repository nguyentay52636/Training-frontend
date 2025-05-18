import { useState, useEffect } from 'react';
import { ChevronDown, Pencil, Plus, Save, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DialogAddBlockNow from '../components/ProgramContent/components/AddBlocKnowledge/DialogAddlbocknow';
import BlocknowledgeActions from '../components/ProgramContent/components/BlocknowledgeActions';
import { cn } from '@/lib/utils';
import PaginationSkeleton from '../components/ProgramContent/components/CourseDetails/components/PaginationSkeleton';
import Schedule from '../components/Schedule';
import { getBlockKnows } from '@/lib/apis/blockKnowApi';

import DialogAddKienThucVaoKhoi from '../components/ProgramContent/components/AddBlocKnowledge/DialogAddKienThucVaoKhoi';
import CourseManager from '../components/ProgramContent/components/CourseDetails/CourseManager';
import { getHocPhanByKienThucId } from '@/lib/apis/KnowsApi';
import { BlockKnowType, CourseType, knowledgeType as KnowledgeType } from '@/lib/apis/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'react-toastify';
import { addDeCuongChiTietAPI } from '@/lib/apis/DeCuongChiTietApi';

// Header component
const Header = () => (
  <div className='flex items-center mb-6 border-b-2 border-gray-200 pb-3 justify-around'>
    <div className='font-bold text-[2.5rem]'>
      <h1>Thông tin chung</h1>
    </div>
    <div className='flex gap-8'>
      <Button className='bg-green-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-md px-[40px]! py-5! cursor-pointer'>
        <Plus className='mr-2 h-5 w-8' /> Sửa
      </Button>
      <Button className='bg-red-600 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-md px-[40px]! py-5! cursor-pointer'>
        <Trash2 className='mr-2 h-5 w-8' /> Xoá
      </Button>
      <Button className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-md px-[40px]! py-5! cursor-pointer'>
        <Save className='mr-2 h-5 w-8' /> Lưu
      </Button>
    </div>
  </div>
);

// TabNavigation component
const TabNavigation = () => (
  <div className='flex justify-center'>
    <TabsList className='flex justify-center gap-4 mb-6 border-b border-gray-200 p-0'>
      <TabsTrigger
        value='general'
        className={cn(
          'pb-2 relative text-xl mx-6',
          'data-[state=active]:text-indigo-600 data-[state=active]:font-semibold',
          'data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-indigo-600 data-[state=inactive]:transition-all',
          'cursor-pointer hover:scale-105 transition-transform duration-200',
          // underline effect using after
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
          // underline effect using after
          'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-indigo-600',
          'after:opacity-0 after:transition-opacity after:duration-300',
          'data-[state=active]:after:opacity-100',
        )}
      >
        2. Mục tiêu đào tạo
      </TabsTrigger>

      <TabsTrigger
        value='curriculum'
        className={cn(
          'pb-2 relative text-xl mx-6',
          'data-[state=active]:text-indigo-600 data-[state=active]:font-semibold',
          'data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-indigo-600 data-[state=inactive]:transition-all',
          'cursor-pointer hover:scale-105 transition-transform duration-200',
          // underline effect using after
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
          // underline effect using after
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

const GeneralInfoTab = () => (
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

// ObjectiveTab component
const ObjectiveTab = () => {
  const [mucTieu, setMucTieu] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!mucTieu.trim()) {
      toast.error('Vui lòng nhập nội dung đề cương chi tiết', {
        position: "top-right",
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
      await addDeCuongChiTietAPI({ mucTieu });
      toast.success('Thêm đề cương chi tiết thành công', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setMucTieu('');
    } catch (error) {
      console.error('Error adding de cuong chi tiet:', error);
      toast.error('Có lỗi xảy ra khi thêm đề cương chi tiết', {
        position: "top-right",
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
};

// CurriculumTab component
const CurriculumTab = () => {
  const [blockKnows, setBlockKnows] = useState<BlockKnowType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedKnowledgeId, setSelectedKnowledgeId] = useState<number | null>(null);
  const [isCourseManagerOpen, setIsCourseManagerOpen] = useState(false);
  const [selectedKnowledgeData, setSelectedKnowledgeData] = useState<KnowledgeType | null>(null);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const fetchBlockKnows = async () => {
    try {
      setLoading(true);
      const data = await getBlockKnows();
      setBlockKnows(data);
    } catch (error) {
      console.error('Error fetching block knowledge:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockKnows();
  }, []);

  const handleAddKnowledge = (blockId: number) => {
    setSelectedBlockId(blockId);
    setIsDialogOpen(true);
  };

  const handleUpdateSuccess = () => {
    fetchBlockKnows(); // Refresh the table data
  };

  const handleKnowledgeClick = async (knowledge: KnowledgeType) => {
    try {
      setLoadingCourses(true);
      setSelectedKnowledgeId(knowledge.idKienThuc || null);

      // Sao chép dữ liệu kiến thức hiện tại
      const knowledgeDataCopy = { ...knowledge };

      if (knowledge.idKienThuc) {
        // Lấy danh sách học phần từ API dựa vào ID kiến thức
        const hocPhans = await getHocPhanByKienThucId(knowledge.idKienThuc);

        // Thêm thuộc tính hocPhans để hiển thị
        // @ts-ignore - thêm thuộc tính động
        knowledgeDataCopy.hocPhans = hocPhans;
      }

      // Cập nhật state và mở CourseManager
      setSelectedKnowledgeData(knowledgeDataCopy);
      setIsCourseManagerOpen(true);
    } catch (error) {
      console.error('Error fetching courses for knowledge:', error);
      // Nếu có lỗi, vẫn hiển thị với dữ liệu sẵn có
      setSelectedKnowledgeData(knowledge);
      setIsCourseManagerOpen(true);
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleKnowledgeSelect = (knowledgeId: string) => {
    // Find knowledge data
    const selectedKnowledge = blockKnows
      .flatMap((block) => block.kienThucList || [])
      .find((k) => k.idKienThuc?.toString() === knowledgeId);

    if (selectedKnowledge) {
      handleKnowledgeClick(selectedKnowledge);
    }
  };

  return (
    <TabsContent value='curriculum'>
      <Card className='border-gray-200 shadow-sm py-12'>
        <CardContent>
          <div className='flex justify-between space-x-4 mb-4'>
            <div className=''>
              <CardTitle className='text-2xl font-bold text-gray-800'>
                Nội dung chương trình
              </CardTitle>
            </div>
            <div className='flex justify-center items-center'>
              <DialogAddBlockNow />
            </div>
          </div>
          <div className='border-t border-gray-300 mb-4'></div>
          <div className='space-y-4'>
            {isCourseManagerOpen && selectedKnowledgeData ? (
              <div>
                <div className='flex justify-between items-center mb-4'>
                  <Button
                    onClick={() => setIsCourseManagerOpen(false)}
                    variant='outline'
                    className='px-4 py-2'
                  >
                    Quay lại
                  </Button>
                  <h2 className='text-2xl font-bold'>{selectedKnowledgeData.tenKienThuc}</h2>
                </div>
                {loadingCourses ? (
                  <div className='flex justify-center items-center h-64'>
                    <div className='text-center'>
                      <div className='w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto'></div>
                      <p className='mt-4 text-lg'>Đang tải danh sách học phần...</p>
                    </div>
                  </div>
                ) : (
                  <CourseManager knowledgeData={selectedKnowledgeData} />
                )}
              </div>
            ) : (
              <div className='w-full'>
                <Table>
                  <TableHeader>
                    <TableRow className='bg-blue-300! '>
                      <TableHead className='text-bold'>STT</TableHead>
                      <TableHead className='text-bold'>Tên khối kiến thức & học phần</TableHead>
                      <TableHead className='text-center'>Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={3} className='text-center'>
                          Đang tải...
                        </TableCell>
                      </TableRow>
                    ) : (
                      blockKnows.map((blockKnow, index) => (
                        <TableRow
                          key={blockKnow.idKhoiKienThuc}
                          className='bg-background hover:bg-secondary'
                        >
                          <TableCell className='font-bold'>{index + 1}</TableCell>
                          <TableCell className='font-medium'>
                            <div>
                              <div className='flex justify-between items-center mb-2'>
                                <div className='font-semibold text-blue-700 text-[1rem]'>
                                  {blockKnow.tenKhoiKienThuc}
                                </div>
                              </div>

                              {blockKnow.kienThucList && blockKnow.kienThucList.length > 0 ? (
                                <div className='mt-2'>
                                  <Select onValueChange={handleKnowledgeSelect}>
                                    <SelectTrigger className='w-full'>
                                      <SelectValue placeholder='Chọn kiến thức' />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {blockKnow.kienThucList.map(
                                          (knowledge: KnowledgeType, idx: number) => (
                                            <SelectItem
                                              key={knowledge.idKienThuc}
                                              value={knowledge.idKienThuc?.toString() || ''}
                                            >
                                              <span className='font-medium'>
                                                {idx + 1}. {knowledge.tenKienThuc}
                                              </span>
                                            </SelectItem>
                                          ),
                                        )}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                              ) : (
                                <div className='text-gray-500 italic text-sm pl-2'>
                                  Chưa có kiến thức nào
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className='text-center'>
                            <div className='flex justify-center'>
                              <BlocknowledgeActions blockKnowId={blockKnow.idKhoiKienThuc || 0} />
                              <Button
                                className='text-blue-600 hover:text-blue-800 cursor-pointer text-center p-3'
                                title='Chỉnh sửa'
                                variant='ghost'
                              >
                                <Pencil size={24} />
                              </Button>
                              <Button
                                className='text-red-600 hover:text-red-800 cursor-pointer text-center p-3'
                                title='Xóa'
                                variant='ghost'
                              >
                                <Trash2 size={24} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                <div className='mt-6'>
                  <PaginationSkeleton
                    currentPage={1}
                    totalPages={1}
                    totalItems={0}
                    onPageChange={() => { }}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedBlockId && (
        <DialogAddKienThucVaoKhoi
          blockKnowId={selectedBlockId}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </TabsContent>
  );
};

export default function SkeletonProgramManager() {
  return (
    <div className='p-6 bg-white text-gray-800'>
      <Header />
      <div className='bg-white p-6 rounded-xl shadow-lg'>
        <Tabs defaultValue='general' className='w-full'>
          <TabNavigation />
          <GeneralInfoTab />
          <ObjectiveTab />
          <CurriculumTab />
          <TabsContent value='schedule'>
            <Schedule />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
