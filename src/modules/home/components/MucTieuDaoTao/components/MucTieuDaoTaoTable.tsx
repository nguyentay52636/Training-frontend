import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { DeCuongChiTiet, deleteDeCuongChiTietAPI } from '@/lib/apis/DeCuongChiTietApi'
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
import { useState } from 'react'

interface MucTieuDaoTaoTableProps {
    data: DeCuongChiTiet[]
    onEdit: (item: DeCuongChiTiet) => void
    onRefresh: () => Promise<void>
}

export default function MucTieuDaoTaoTable({ data, onEdit, onRefresh }: MucTieuDaoTaoTableProps) {
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const handleDelete = async () => {
        if (deleteId) {
            try {
                await deleteDeCuongChiTietAPI(deleteId)
                await onRefresh()
            } catch (error) {
                console.error('Error deleting item:', error)
            }
        }
        setDeleteId(null)
    }

    return (
        <>
            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px] text-center">STT</TableHead>
                            <TableHead className="w-[200px] text-center">Học phần</TableHead>
                            <TableHead className="w-[60%] px-4">Mục tiêu</TableHead>
                            <TableHead className="text-right w-[140px] pr-6">Thao tác</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={item.id} className="hover:bg-gray-50 transition-colors group">
                                <TableCell className="text-center align-middle font-medium">{index + 1}</TableCell>
                                <TableCell className="text-center align-middle">
                                    {item.hocPhan && typeof item.hocPhan === 'object' && 'maHP' in item.hocPhan && 'tenHP' in item.hocPhan
                                        ? `${(item.hocPhan as { maHP: string; tenHP: string }).maHP} - ${(item.hocPhan as { maHP: string; tenHP: string }).tenHP}`
                                        : (item.idHocPhan || '-')}
                                </TableCell>
                                <TableCell className="whitespace-pre-wrap px-4 align-middle">{item.mucTieu}</TableCell>
                                <TableCell className="text-right align-middle pr-6">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            className='cursor-pointer text-blue-600 hover:text-blue-700 rounded-full p-2 h-8 w-8 flex items-center justify-center'
                                            size="icon"
                                            onClick={() => onEdit(item)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            className='cursor-pointer text-red-600 hover:text-red-700 rounded-full p-2 h-8 w-8 flex items-center justify-center'
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDeleteId(item.id!)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa mục tiêu đào tạo này?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Xóa</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
