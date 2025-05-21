import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Loader2, Trash2, ArrowUpDown } from 'lucide-react'
import { BlockKnowType } from '@/lib/apis/types'
import ActionsManagerBlockKnowledge from './ActionsManagerBlockKnowledge'
import { Checkbox } from '@/components/ui/checkbox'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { deleteBlockKnow } from '@/lib/apis/blockKnowApi'
import PaginationManagerBlockKnowledge from './PaginationManagerBlockKnowledge'

const BATCH_SIZE = 5; // Process 5 items at a time
const API_TIMEOUT = 10000; // 10 seconds timeout

interface TableManagerBlockKnowledgeProps {
    data: BlockKnowType[]
    isLoading: boolean
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    refetchData: () => void
    onPageSizeChange?: (pageSize: number) => void
    pageSize?: number
    totalItems: number
    selectedItems?: number[]
    onDelete: (items: number[]) => Promise<void>
}

export default function TableManagerBlockKnowledge({
    data,
    isLoading,
    currentPage,
    totalPages,
    onPageChange,
    refetchData,
    onPageSizeChange,
    pageSize = 10,
    totalItems,
    selectedItems = [],
    onDelete
}: TableManagerBlockKnowledgeProps) {
    const [openBulkDeleteDialog, setOpenBulkDeleteDialog] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteProgress, setDeleteProgress] = useState(0)

    const handleSelectAll = () => {
        if (selectedItems.length === data.length) {
            onDelete([])
        } else {
            onDelete(data.filter(item => item.idKhoiKienThuc).map(item => item.idKhoiKienThuc!) as number[])
        }
    }

    const handleSelectItem = (id: number | undefined) => {
        if (!id) return

        if (selectedItems.includes(id)) {
            onDelete(selectedItems.filter(item => item !== id))
        } else {
            onDelete([...selectedItems, id])
        }
    }

    const processBatch = async (items: number[]): Promise<void> => {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Request timeout')), API_TIMEOUT);
        });

        const deletePromises = items.map(id =>
            Promise.race([
                deleteBlockKnow(id),
                timeoutPromise
            ])
        );

        await Promise.all(deletePromises);
    };

    const handleBulkDelete = async () => {
        if (selectedItems.length === 0) {
            toast.error('Vui lòng chọn ít nhất một khối kiến thức để xóa')
            return
        }

        try {
            setIsDeleting(true)
            setDeleteProgress(0)

            // Process items in batches
            const batches = [];
            for (let i = 0; i < selectedItems.length; i += BATCH_SIZE) {
                batches.push(selectedItems.slice(i, i + BATCH_SIZE));
            }

            let successCount = 0;
            let errorCount = 0;

            for (const batch of batches) {
                try {
                    await processBatch(batch);
                    successCount += batch.length;
                } catch (error) {
                    console.error('Error processing batch:', error);
                    errorCount += batch.length;
                }
                setDeleteProgress(prev => prev + (batch.length / selectedItems.length) * 100);
            }

            if (successCount > 0) {
                toast.success(`Đã xóa ${successCount} khối kiến thức thành công`);
            }
            if (errorCount > 0) {
                toast.error(`${errorCount} khối kiến thức xóa thất bại`);
            }

            onDelete([])
            refetchData()
        } catch (error) {
            console.error('Error in bulk delete:', error);
            toast.error('Có lỗi xảy ra khi xóa các khối kiến thức')
        } finally {
            setIsDeleting(false)
            setDeleteProgress(0)
            setOpenBulkDeleteDialog(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                <span className="ml-2 text-gray-500">Đang tải dữ liệu...</span>
            </div>
        )
    }

    return (
        <div>
            {selectedItems.length > 0 && (
                <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 rounded-md">
                    <span className="text-sm font-medium">
                        Đã chọn {selectedItems.length} mục
                    </span>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpenBulkDeleteDialog(true)}
                        disabled={isDeleting}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {isDeleting ? `Đang xóa (${Math.round(deleteProgress)}%)` : 'Xóa đã chọn'}
                    </Button>
                </div>
            )}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox
                                checked={data.length > 0 && selectedItems.length === data.length}
                                onCheckedChange={handleSelectAll}
                            />
                        </TableHead>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>Tên khối kiến thức</TableHead>
                        <TableHead>
                            <div className="flex items-center">
                                Số kiến thức
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </div>
                        </TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center h-24 text-gray-500">
                                Không có dữ liệu khối kiến thức
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((block) => (
                            <TableRow key={block.idKhoiKienThuc} className={
                                selectedItems.includes(block.idKhoiKienThuc as number) ? "bg-gray-50" : ""
                            }>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedItems.includes(block.idKhoiKienThuc as number)}
                                        onCheckedChange={() => handleSelectItem(block.idKhoiKienThuc)}
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{block.idKhoiKienThuc}</TableCell>
                                <TableCell>{block.tenKhoiKienThuc}</TableCell>
                                <TableCell>{block.kienThucList?.length || 0}</TableCell>
                                <TableCell className="text-right">
                                    <ActionsManagerBlockKnowledge
                                        block={block}
                                        onSuccess={refetchData}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Phân trang mới */}
            {totalPages > 0 && (
                <PaginationManagerBlockKnowledge
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    onPageChange={onPageChange}
                    onPageSizeChange={onPageSizeChange}
                    pageSize={pageSize}
                />
            )}

            {/* Bulk delete confirmation dialog */}
            <AlertDialog open={openBulkDeleteDialog} onOpenChange={setOpenBulkDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xóa nhiều khối kiến thức</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa {selectedItems.length} khối kiến thức đã chọn? Hành động này không thể hoàn tác.
                            {isDeleting && (
                                <div className="mt-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-blue-600 h-2.5 rounded-full"
                                            style={{ width: `${deleteProgress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Đang xóa... {Math.round(deleteProgress)}%
                                    </p>
                                </div>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleBulkDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? 'Đang xóa...' : 'Xóa'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
