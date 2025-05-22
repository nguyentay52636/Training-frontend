import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateBlockKnow, deleteBlockKnow } from '@/lib/apis/blockKnowApi';
import { toast } from 'sonner';

interface ActionsDeleteEditBlockProps {
    blockId: number;
    blockName: string;
    onUpdateSuccess?: () => void;
}

export default function ActionsDeleteEditBlock({ blockId, blockName, onUpdateSuccess }: ActionsDeleteEditBlockProps) {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editedName, setEditedName] = useState(blockName);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleEdit = async () => {
        try {
            await updateBlockKnow(blockId, {
                idKhoiKienThuc: blockId,
                tenKhoiKienThuc: editedName,
                kienThucList: [] // Keep existing knowledge list
            });
            toast.success('Cập nhật khối kiến thức thành công');
            setIsEditDialogOpen(false);
            onUpdateSuccess?.();
        } catch (error) {
            toast.error('Có lỗi xảy ra khi cập nhật khối kiến thức');
            console.error('Error updating block:', error);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa khối kiến thức này?')) {
            return;
        }

        try {
            setIsDeleting(true);
            await deleteBlockKnow(blockId);
            toast.success('Xóa khối kiến thức thành công');
            onUpdateSuccess?.();
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xóa khối kiến thức');
            console.error('Error deleting block:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Button
                className='text-blue-600 hover:text-blue-800 cursor-pointer text-center p-3'
                title='Chỉnh sửa'
                variant='ghost'
                onClick={() => setIsEditDialogOpen(true)}
            >
                <Pencil size={24} />
            </Button>
            <Button
                className='text-red-600 hover:text-red-800 cursor-pointer text-center p-3'
                title='Xóa'
                variant='ghost'
                onClick={handleDelete}
                disabled={isDeleting}
            >
                <Trash2 size={24} />
            </Button>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa khối kiến thức</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Tên khối kiến thức</Label>
                            <Input
                                id="name"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Hủy
                        </Button>
                        <Button onClick={handleEdit}>
                            Lưu thay đổi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
