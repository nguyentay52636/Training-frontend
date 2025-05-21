import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DialogConfirmDeleteKhoiKienThucProps {
    selectedItems: any[];
    onDelete: () => Promise<void>;
}

export default function DialogConfirmDeleteKhoiKienThuc({ selectedItems, onDelete }: DialogConfirmDeleteKhoiKienThucProps) {
    const [openBulkDeleteDialog, setOpenBulkDeleteDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteProgress, setDeleteProgress] = useState(0);

    const handleBulkDelete = async () => {
        try {
            setIsDeleting(true);
            setDeleteProgress(0);

            // Simulate progress
            const interval = setInterval(() => {
                setDeleteProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 200);

            await onDelete();

            clearInterval(interval);
            setDeleteProgress(100);
            setOpenBulkDeleteDialog(false);
        } catch (error) {
            console.error('Error deleting items:', error);
        } finally {
            setIsDeleting(false);
            setDeleteProgress(0);
        }
    };

    return (
        <>
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
        </>
    )
}
