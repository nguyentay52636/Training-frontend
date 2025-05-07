import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { Button } from '@/components/ui/button'
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { BlockKnowType } from '@/lib/apis/types'
import { deleteBlockKnow } from '@/lib/apis/blockKnowApi'
import { toast } from 'sonner'
import DialogAddManagerBlockKnowledge from './DialogAddManagerBlockKnowledge'
import DialogViewBlockKnowledge from './DialogViewBlockKnowledge'

interface ActionsManagerBlockKnowledgeProps {
    block: BlockKnowType
    onSuccess: () => void
}

export default function ActionsManagerBlockKnowledge({
    block,
    onSuccess
}: ActionsManagerBlockKnowledgeProps) {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const [openViewDialog, setOpenViewDialog] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!block.idKhoiKienThuc) {
            toast.error('Không thể xóa khối kiến thức này')
            return
        }

        try {
            setIsDeleting(true)
            await deleteBlockKnow(block.idKhoiKienThuc)
            toast.success('Xóa khối kiến thức thành công')
            onSuccess()
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xóa khối kiến thức')
            console.error(error)
        } finally {
            setIsDeleting(false)
            setOpenDeleteDialog(false)
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Mở menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setOpenViewDialog(true)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpenEditDialog(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpenDeleteDialog(true)}
                        className="text-red-600"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Xóa
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Delete confirmation dialog */}
            <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Hành động này không thể hoàn tác. Khối kiến thức "{block.tenKhoiKienThuc}" sẽ bị xóa vĩnh viễn.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? 'Đang xóa...' : 'Xóa'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Edit dialog */}
            {openEditDialog && (
                <DialogAddManagerBlockKnowledge
                    open={openEditDialog}
                    onOpenChange={setOpenEditDialog}
                    onSuccess={onSuccess}
                    editMode
                    blockToEdit={block}
                />
            )}

            {/* View dialog */}
            {openViewDialog && (
                <DialogViewBlockKnowledge
                    open={openViewDialog}
                    onOpenChange={setOpenViewDialog}
                    block={block}
                />
            )}
        </>
    )
}
