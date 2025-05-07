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
import { BlockKnowType, knowledgeType } from '@/lib/apis/types'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Book, PlusCircle, Trash2, RefreshCw, Search } from 'lucide-react'
import { addKnowInBlockKnow, deleteKnowInBlockKnow, getBlockKnowById } from '@/lib/apis/blockKnowApi'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import { getKnows } from '@/lib/apis/KnowsApi'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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

interface DialogViewBlockKnowledgeProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    block: BlockKnowType
}

export default function DialogViewBlockKnowledge({
    open,
    onOpenChange,
    block: initialBlock,
}: DialogViewBlockKnowledgeProps) {
    const [block, setBlock] = useState<BlockKnowType>(initialBlock)
    const [selectedKnowledgeId, setSelectedKnowledgeId] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState('')
    const [isAdding, setIsAdding] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)
    const [knowledgeToRemove, setKnowledgeToRemove] = useState<knowledgeType | null>(null)
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false)

    // Fetch available knowledge items
    const { data: allKnowledges = [] } = useQuery({
        queryKey: ['knowledges'],
        queryFn: getKnows
    })

    // Refresh block data
    const refreshBlockData = async () => {
        if (block.idKhoiKienThuc) {
            try {
                const updatedBlock = await getBlockKnowById(block.idKhoiKienThuc)
                setBlock(updatedBlock)
            } catch (error) {
                toast.error('Có lỗi xảy ra khi tải lại dữ liệu khối kiến thức')
                console.error(error)
            }
        }
    }

    // Filter available knowledge items to exclude ones already in the block
    const availableKnowledges = allKnowledges.filter(
        (item: knowledgeType) => !block.kienThucList?.some(k => k.idKienThuc === item.idKienThuc)
    )

    // Filter knowledge items in the block based on search term
    const filteredBlockKnowledges = block.kienThucList?.filter(
        k => k.tenKienThuc.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    // Add knowledge to block
    const handleAddKnowledge = async () => {
        if (!selectedKnowledgeId || !block.idKhoiKienThuc) {
            toast.error('Vui lòng chọn kiến thức để thêm vào khối')
            return
        }

        try {
            setIsAdding(true)
            await addKnowInBlockKnow(block.idKhoiKienThuc, parseInt(selectedKnowledgeId))
            await refreshBlockData()
            setSelectedKnowledgeId('')
            toast.success('Thêm kiến thức vào khối thành công')
        } catch (error) {
            toast.error('Có lỗi xảy ra khi thêm kiến thức vào khối')
            console.error(error)
        } finally {
            setIsAdding(false)
        }
    }

    // Remove knowledge from block
    const handleRemoveKnowledge = async () => {
        if (!knowledgeToRemove?.idKienThuc || !block.idKhoiKienThuc) {
            toast.error('Không thể xóa kiến thức này')
            return
        }

        try {
            setIsRemoving(true)
            await deleteKnowInBlockKnow(block.idKhoiKienThuc, knowledgeToRemove.idKienThuc)
            await refreshBlockData()
            toast.success('Xóa kiến thức khỏi khối thành công')
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xóa kiến thức khỏi khối')
            console.error(error)
        } finally {
            setIsRemoving(false)
            setOpenRemoveDialog(false)
            setKnowledgeToRemove(null)
        }
    }

    // When the dialog opens, refresh data and reset form
    useEffect(() => {
        if (open) {
            setBlock(initialBlock)
            setSelectedKnowledgeId('')
            setSearchTerm('')
        }
    }, [open, initialBlock])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[850px]">
                <DialogHeader>
                    <DialogTitle>Chi tiết khối kiến thức</DialogTitle>
                    <DialogDescription>
                        Thông tin chi tiết về khối kiến thức và các kiến thức liên quan
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-500">ID</h3>
                        <p className="mt-1">{block.idKhoiKienThuc || 'Chưa có ID'}</p>
                    </div>
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-500">Tên khối kiến thức</h3>
                        <p className="mt-1 text-lg font-semibold">{block.tenKhoiKienThuc}</p>
                    </div>

                    {/* Add knowledge form */}
                    <div className="mb-6 p-4 border rounded-md bg-gray-50">
                        <h3 className="font-medium mb-3">Thêm kiến thức vào khối</h3>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-grow">
                                <Select value={selectedKnowledgeId} onValueChange={setSelectedKnowledgeId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn kiến thức để thêm" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableKnowledges.length === 0 ? (
                                            <SelectItem value="none" disabled>
                                                Không có kiến thức khả dụng
                                            </SelectItem>
                                        ) : (
                                            availableKnowledges.map((k: knowledgeType) => (
                                                <SelectItem key={k.idKienThuc} value={k.idKienThuc?.toString() || ''}>
                                                    {k.tenKienThuc}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                onClick={handleAddKnowledge}
                                disabled={!selectedKnowledgeId || isAdding}
                                className="bg-blue-700 hover:bg-blue-600 text-white"
                            >
                                {isAdding ? (
                                    <>
                                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                        Đang thêm...
                                    </>
                                ) : (
                                    <>
                                        <PlusCircle className="h-4 w-4 mr-2" />
                                        Thêm kiến thức
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Related knowledge list */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-md font-medium">Danh sách kiến thức thuộc khối</h3>
                            <div className="relative w-[250px]">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    type="search"
                                    placeholder="Tìm kiếm kiến thức..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {filteredBlockKnowledges.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[80px]">ID</TableHead>
                                        <TableHead>Tên kiến thức</TableHead>
                                        <TableHead>Loại học phần</TableHead>
                                        <TableHead className="w-[100px] text-right">Số học phần</TableHead>
                                        <TableHead className="w-[80px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredBlockKnowledges.map((knowledge) => (
                                        <TableRow key={knowledge.idKienThuc}>
                                            <TableCell className="font-medium">{knowledge.idKienThuc}</TableCell>
                                            <TableCell>{knowledge.tenKienThuc}</TableCell>
                                            <TableCell>{knowledge.loaiHocPhan}</TableCell>
                                            <TableCell className="text-right">{knowledge.hocPhanList?.length || 0}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => {
                                                        setKnowledgeToRemove(knowledge)
                                                        setOpenRemoveDialog(true)
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-32 border rounded-md bg-gray-50">
                                <Book className="h-10 w-10 text-gray-400 mb-2" />
                                <p className="text-gray-500">
                                    {block.kienThucList?.length ? 'Không tìm thấy kiến thức phù hợp' : 'Chưa có kiến thức nào trong khối này'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Đóng
                    </Button>
                    <Button
                        type="button"
                        onClick={refreshBlockData}
                        className="bg-blue-700 hover:bg-blue-600 text-white"
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Làm mới dữ liệu
                    </Button>
                </DialogFooter>
            </DialogContent>

            {/* Delete knowledge confirmation dialog */}
            <AlertDialog open={openRemoveDialog} onOpenChange={setOpenRemoveDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xóa kiến thức khỏi khối</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa kiến thức "{knowledgeToRemove?.tenKienThuc}" khỏi khối kiến thức này?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isRemoving}>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleRemoveKnowledge}
                            disabled={isRemoving}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isRemoving ? 'Đang xóa...' : 'Xóa'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Dialog>
    )
} 