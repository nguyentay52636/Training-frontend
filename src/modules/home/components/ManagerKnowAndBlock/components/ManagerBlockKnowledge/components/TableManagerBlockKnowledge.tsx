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
    totalItems
}: TableManagerBlockKnowledgeProps) {
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const [openBulkDeleteDialog, setOpenBulkDeleteDialog] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleSelectAll = () => {
        if (selectedItems.length === data.length) {
            setSelectedItems([])
        } else {
            setSelectedItems(data.filter(item => item.idKhoiKienThuc).map(item => item.idKhoiKienThuc!) as number[])
        }
    }

    const handleSelectItem = (id: number | undefined) => {
        if (!id) return

        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    const handleBulkDelete = async () => {
        if (selectedItems.length === 0) {
            toast.error('Vui lòng chọn ít nhất một khối kiến thức để xóa')
            return
        }

        try {
            setIsDeleting(true)

            // Delete items one by one
            const deletePromises = selectedItems.map(id => deleteBlockKnow(id))
            await Promise.all(deletePromises)

            toast.success(`Đã xóa ${selectedItems.length} khối kiến thức thành công`)
            setSelectedItems([])
            refetchData()
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xóa các khối kiến thức')
            console.error(error)
        } finally {
            setIsDeleting(false)
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
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Xóa đã chọn
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
