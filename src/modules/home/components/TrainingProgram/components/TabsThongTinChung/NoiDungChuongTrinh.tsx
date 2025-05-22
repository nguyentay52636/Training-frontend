import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DialogAddBlockNow from '../ProgramContent/components/AddBlocKnowledge/DialogAddlbocknow';
import BlocknowledgeActions from '../ProgramContent/components/BlocknowledgeActions';
import PaginationSkeleton from '../ProgramContent/components/CourseDetails/components/PaginationSkeleton';
import CourseManager from '../ProgramContent/components/CourseDetails/CourseManager';
import DialogAddKienThucVaoKhoi from '../ProgramContent/components/AddBlocKnowledge/DialogAddKienThucVaoKhoi';
import { getBlockKnows } from '@/lib/apis/blockKnowApi';
import { getHocPhanByKienThucId } from '@/lib/apis/KnowsApi';
import { BlockKnowType, knowledgeType as KnowledgeType } from '@/lib/apis/types';

export default function NoiDungChuongTrinh() {
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
    fetchBlockKnows();
  };

  const handleKnowledgeClick = async (knowledge: KnowledgeType) => {
    try {
      setLoadingCourses(true);
      setSelectedKnowledgeId(knowledge.idKienThuc || null);

      const knowledgeDataCopy = { ...knowledge };

      if (knowledge.idKienThuc) {
        const hocPhans = await getHocPhanByKienThucId(knowledge.idKienThuc);
        // @ts-ignore
        knowledgeDataCopy.hocPhans = hocPhans;
      }

      setSelectedKnowledgeData(knowledgeDataCopy);
      setIsCourseManagerOpen(true);
    } catch (error) {
      console.error('Error fetching courses for knowledge:', error);
      setSelectedKnowledgeData(knowledge);
      setIsCourseManagerOpen(true);
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleKnowledgeSelect = (knowledgeId: string) => {
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
            <div>
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
                    onPageChange={() => {}}
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
}
