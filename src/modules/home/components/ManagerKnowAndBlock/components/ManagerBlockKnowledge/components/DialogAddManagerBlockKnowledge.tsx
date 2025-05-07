import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { addBlockKnow, updateBlockKnow } from '@/lib/apis/blockKnowApi'
import { BlockKnowType } from '@/lib/apis/types'

interface DialogAddManagerBlockKnowledgeProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
    editMode?: boolean
    blockToEdit?: BlockKnowType
}

export default function DialogAddManagerBlockKnowledge({
    open,
    onOpenChange,
    onSuccess,
    editMode = false,
    blockToEdit,
}: DialogAddManagerBlockKnowledgeProps) {
    const [name, setName] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dialogTitle = editMode ? 'Chỉnh sửa khối kiến thức' : 'Thêm khối kiến thức mới'
    const buttonText = editMode ? 'Cập nhật' : 'Thêm mới'

    useEffect(() => {
        if (editMode && blockToEdit) {
            setName(blockToEdit.tenKhoiKienThuc)
        } else {
            setName('')
        }
    }, [editMode, blockToEdit])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim()) {
            toast.error('Vui lòng nhập tên khối kiến thức')
            return
        }

        try {
            setIsSubmitting(true)

            if (editMode && blockToEdit?.idKhoiKienThuc) {
                // Update existing block knowledge
                await updateBlockKnow(blockToEdit.idKhoiKienThuc, {
                    tenKhoiKienThuc: name,
                    kienThucList: blockToEdit.kienThucList || []
                })
                toast.success('Cập nhật khối kiến thức thành công')
            } else {
                // Add new block knowledge
                await addBlockKnow({
                    tenKhoiKienThuc: name,
                    kienThucList: []
                })
                toast.success('Thêm khối kiến thức mới thành công')
            }

            onSuccess()
            onOpenChange(false)
        } catch (error) {
            toast.error(editMode
                ? 'Có lỗi xảy ra khi cập nhật khối kiến thức'
                : 'Có lỗi xảy ra khi thêm khối kiến thức mới'
            )
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>
                        {editMode
                            ? 'Chỉnh sửa thông tin khối kiến thức'
                            : 'Thêm khối kiến thức mới vào hệ thống'
                        }
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Tên khối
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nhập tên khối kiến thức"
                                className="col-span-3"
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Hủy
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Đang xử lý...' : buttonText}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
