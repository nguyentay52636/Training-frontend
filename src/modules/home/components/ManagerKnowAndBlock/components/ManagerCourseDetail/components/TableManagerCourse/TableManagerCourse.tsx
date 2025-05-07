import { useState, useEffect } from 'react'
import { toast } from 'sonner'
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
import { CourseType } from '@/lib/apis/types'
import { getAllCourse, deleteCourse } from '@/lib/apis/CourseApi'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import PaginationCourse from '../PaginationCourse'

interface TableManagerCourseProps {
    onEdit: (course: CourseType) => void;
}

export default function TableManagerCourse({ onEdit }: TableManagerCourseProps) {
    const [courses, setCourses] = useState<CourseType[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [alertOpen, setAlertOpen] = useState(false)
    const [courseToDelete, setCourseToDelete] = useState<number | null>(null)

    // Phân trang
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const fetchCourses = async () => {
        setLoading(true)
        try {
            const data = await getAllCourse()
            setCourses(data)
        } catch (error) {
            toast.error('Không thể tải danh sách học phần', {
                description: 'Đã xảy ra lỗi khi tải dữ liệu'
            })
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    // Reset về trang 1 khi thay đổi bộ lọc hoặc tìm kiếm
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, selectedFilter])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleFilterChange = (value: string) => {
        setSelectedFilter(value)
    }

    const confirmDelete = (id: number) => {
        setCourseToDelete(id)
        setAlertOpen(true)
    }

    const handleDelete = async () => {
        if (!courseToDelete) return

        try {
            await deleteCourse(courseToDelete)
            toast.success('Đã xóa học phần', {
                description: 'Học phần đã được xóa thành công'
            })
            fetchCourses() // Refresh list
        } catch (error) {
            toast.error('Không thể xóa học phần', {
                description: 'Đã xảy ra lỗi khi xóa học phần'
            })
        } finally {
            setAlertOpen(false)
            setCourseToDelete(null)
        }
    }

    // Filter courses based on search term and selected filter
    const filteredCourses = courses.filter((course) => {
        const matchesSearch =
            course.tenHP?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.maHP?.toLowerCase().includes(searchTerm.toLowerCase())

        if (selectedFilter === 'all') return matchesSearch
        return matchesSearch && course.loaiHocPhan === selectedFilter
    })

    // Tính toán dữ liệu phân trang
    const totalItems = filteredCourses.length
    const totalPages = Math.ceil(totalItems / pageSize)
    const paginatedCourses = filteredCourses.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handlePageSizeChange = (size: number) => {
        setPageSize(size)
        setCurrentPage(1) // Reset về trang 1 khi thay đổi kích thước trang
    }

    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">Quản lý học phần</CardTitle>
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Tìm kiếm học phần..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <Select value={selectedFilter} onValueChange={handleFilterChange}>
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
                                <TableHead className="font-bold">Mã HP</TableHead>
                                <TableHead className="font-bold">Tên học phần</TableHead>
                                <TableHead className="font-bold text-center">Số tín chỉ</TableHead>
                                <TableHead className="font-bold text-center">Lý thuyết</TableHead>
                                <TableHead className="font-bold text-center">Thực hành</TableHead>
                                <TableHead className="font-bold text-center">Loại</TableHead>
                                <TableHead className="font-bold text-center">Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8">
                                        <div className="flex justify-center items-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                            <span className="ml-2">Đang tải...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : paginatedCourses.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center py-8">
                                        Không tìm thấy học phần nào
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedCourses.map((course, index) => (
                                    <TableRow key={course.idHocPhan} className="hover:bg-gray-50">
                                        <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                        <TableCell className="font-medium">{course.maHP}</TableCell>
                                        <TableCell>{course.tenHP}</TableCell>
                                        <TableCell className="text-center">{course.soTinChi}</TableCell>
                                        <TableCell className="text-center">{course.soTietLyThuyet}</TableCell>
                                        <TableCell className="text-center">{course.soTietThucHanh}</TableCell>
                                        <TableCell className="text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${course.loaiHocPhan === 'BẮT BUỘC'
                                                ? 'bg-blue-100 text-blue-800'
                                                : course.loaiHocPhan === 'TỰ CHỌN'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-purple-100 text-purple-800'
                                                }`}>
                                                {course.loaiHocPhan}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-center space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-blue-600"
                                                    onClick={() => onEdit(course)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-600"
                                                    onClick={() => confirmDelete(course.idHocPhan || 0)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <FileSymlink className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                                                        <DropdownMenuItem>Đính kèm đề cương</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {/* Phân trang */}
                    {!loading && filteredCourses.length > 0 && (
                        <PaginationCourse
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            onPageSizeChange={handlePageSizeChange}
                        />
                    )}
                </div>
            </CardContent>

            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận xóa học phần</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc chắn muốn xóa học phần này? Hành động này không thể hoàn tác.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    )
}
