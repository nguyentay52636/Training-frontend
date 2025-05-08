import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Search, Pencil, Trash2, FileSymlink } from 'lucide-react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import PaginationManagerKnowledge from './PaginationManagerKnowledge'
import { getKnows, deleteKnow } from '@/lib/apis/KnowsApi'
import { knowledgeType } from '@/lib/apis/types'

interface TableManagerKnowledgeProps {
    onEditKnowledge: (knowledge: knowledgeType) => void
}

export default function TableManagerKnowledge({ onEditKnowledge }: TableManagerKnowledgeProps) {
    const [knowledgeList, setKnowledgeList] = useState<knowledgeType[]>([])
    const [filteredList, setFilteredList] = useState<knowledgeType[]>([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [typeFilter, setTypeFilter] = useState('all')
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [knowledgeToDelete, setKnowledgeToDelete] = useState<number | null>(null)

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [paginatedData, setPaginatedData] = useState<knowledgeType[]>([])

    // Fetch knowledge data
    const fetchKnowledgeData = async () => {
        try {
            setLoading(true)
            const data = await getKnows()
            setKnowledgeList(data)
            setFilteredList(data)
            setTotalItems(data.length)
            setLoading(false)
        } catch (error) {
            toast.error('Không thể tải dữ liệu kiến thức')
            setLoading(false)
        }
    }

    // Initial data fetch
    useEffect(() => {
        fetchKnowledgeData()
    }, [])

    // Handle search and filter
    useEffect(() => {
        let result = knowledgeList

        // Apply search filter
        if (searchTerm) {
            result = result.filter(item =>
                item.tenKienThuc.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Apply type filter
        if (typeFilter !== 'all') {
            result = result.filter(item => item.loaiHocPhan === typeFilter)
        }

        setFilteredList(result)
        setTotalItems(result.length)
        setCurrentPage(1) // Reset to first page when filters change
    }, [searchTerm, typeFilter, knowledgeList])

    // Handle pagination
    useEffect(() => {
        const start = (currentPage - 1) * pageSize
        const end = start + pageSize
        setPaginatedData(filteredList.slice(start, end))
    }, [filteredList, currentPage, pageSize])

    // Handle delete knowledge
    const handleDeleteClick = (id: number) => {
        setKnowledgeToDelete(id)
        setIsDeleteDialogOpen(true)
    }

    const confirmDelete = async () => {
        if (knowledgeToDelete) {
            try {
                await deleteKnow(knowledgeToDelete)
                toast.success('Xóa kiến thức thành công', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
                fetchKnowledgeData() // Refresh data after delete
                setIsDeleteDialogOpen(false)
            } catch (error) {
                toast.error('Không thể xóa kiến thức', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            }
        }
    }

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize)

    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">Quản lý kiến thức</CardTitle>
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Tìm kiếm kiến thức..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue placeholder="Loại học phần" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả</SelectItem>
                            <SelectItem value="BẮT BUỘC">Bắt buộc</SelectItem>
                            <SelectItem value="TỰ CHỌN">Tự chọn</SelectItem>
                            <SelectItem value="THỰC TẬP">Thực tập</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-blue-50">
                                <TableHead className="font-bold">STT</TableHead>
                                <TableHead className="font-bold">Tên kiến thức</TableHead>
                                <TableHead className="font-bold">Loại học phần</TableHead>
                                <TableHead className="font-bold text-center">Số học phần</TableHead>
                                <TableHead className="font-bold text-center">Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">
                                        <div className="flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                                        </div>
                                        <p className="mt-2 text-gray-500">Đang tải dữ liệu...</p>
                                    </TableCell>
                                </TableRow>
                            ) : paginatedData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10">
                                        <p className="text-gray-500">Không có dữ liệu</p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedData.map((item, index) => (
                                    <TableRow key={item.idKienThuc} className="hover:bg-blue-50">
                                        <TableCell className="font-medium">
                                            {(currentPage - 1) * pageSize + index + 1}
                                        </TableCell>
                                        <TableCell>{item.tenKienThuc}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.loaiHocPhan === 'BẮT BUỘC'
                                                ? 'bg-blue-100 text-blue-800'
                                                : item.loaiHocPhan === 'TỰ CHỌN'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-purple-100 text-purple-800'
                                                }`}>
                                                {item.loaiHocPhan}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {item.hocPhanList?.length || 0}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex justify-center space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-blue-600 border-blue-200 hover:bg-blue-50"
                                                    onClick={() => onEditKnowledge(item)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50"
                                                    onClick={() => handleDeleteClick(item.idKienThuc as number)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {totalItems > 0 && (
                        <PaginationManagerKnowledge
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            onPageChange={setCurrentPage}
                            onPageSizeChange={setPageSize}
                            pageSize={pageSize}
                        />
                    )}
                </div>
            </CardContent>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa kiến thức</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa kiến thức này? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={confirmDelete}
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    )
}