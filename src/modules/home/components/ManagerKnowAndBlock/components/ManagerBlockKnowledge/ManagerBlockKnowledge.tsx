import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlusCircle, RefreshCw, Search, Filter } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getBlockKnows } from '@/lib/apis/blockKnowApi'
import DialogAddManagerBlockKnowledge from './components/DialogAddManagerBlockKnowledge'
import TableManagerBlockKnowledge from './components/TableManagerBlockKnowledge'
import DashBoardManagerBlockKnowledge from './components/DashBoardManagerBlockKnowledge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ManagerBlockKnowledge() {
    // State for pagination and filtering
    const [searchTerm, setSearchTerm] = useState('')
    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [sortBy, setSortBy] = useState<'name' | 'id' | 'count'>('id')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    // Fetch block knowledge data
    const {
        data: blockKnowledges = [],
        isLoading,
        isError,
        refetch
    } = useQuery({
        queryKey: ['blockKnowledges'],
        queryFn: getBlockKnows
    })

    // Filter by search term
    const filteredKnowledges = blockKnowledges?.filter(block =>
        block.tenKhoiKienThuc.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    // Sort the filtered knowledge blocks
    const sortedKnowledges = [...filteredKnowledges].sort((a, b) => {
        if (sortBy === 'name') {
            const comparison = a.tenKhoiKienThuc.localeCompare(b.tenKhoiKienThuc)
            return sortDirection === 'asc' ? comparison : -comparison
        } else if (sortBy === 'count') {
            const aCount = a.kienThucList?.length || 0
            const bCount = b.kienThucList?.length || 0
            return sortDirection === 'asc' ? aCount - bCount : bCount - aCount
        } else { // sortBy === 'id'
            const aId = a.idKhoiKienThuc || 0
            const bId = b.idKhoiKienThuc || 0
            return sortDirection === 'asc' ? aId - bId : bId - aId
        }
    })

    // Calculate total items and pages
    const totalItems = sortedKnowledges.length
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

    // Ensure current page is valid
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages)
        }
    }, [currentPage, totalPages])

    // Calculate pagination
    const startIndex = (currentPage - 1) * pageSize
    const paginatedKnowledges = sortedKnowledges.slice(startIndex, startIndex + pageSize)

    // Calculate statistics
    const totalBlocks = blockKnowledges?.length || 0
    const totalKnowledges = blockKnowledges?.reduce((total, block) => total + (block.kienThucList?.length || 0), 0) || 0
    const emptyBlocks = blockKnowledges?.filter(block => !block.kienThucList?.length).length || 0
    const avgKnowledgePerBlock = totalBlocks > 0 ? Math.round((totalKnowledges / totalBlocks) * 10) / 10 : 0

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1) // Reset to first page on new search
    }

    // Handle refresh button click
    const handleRefresh = () => {
        refetch()
        toast.success('Dữ liệu đã được làm mới')
    }

    // Handle sort change
    const handleSortChange = (value: string) => {
        if (value === 'nameAsc') {
            setSortBy('name')
            setSortDirection('asc')
        } else if (value === 'nameDesc') {
            setSortBy('name')
            setSortDirection('desc')
        } else if (value === 'idAsc') {
            setSortBy('id')
            setSortDirection('asc')
        } else if (value === 'idDesc') {
            setSortBy('id')
            setSortDirection('desc')
        } else if (value === 'countAsc') {
            setSortBy('count')
            setSortDirection('asc')
        } else if (value === 'countDesc') {
            setSortBy('count')
            setSortDirection('desc')
        }
        setCurrentPage(1) // Reset to first page on sort change
    }

    // Handle page size change
    const handlePageSizeChange = (newPageSize: number) => {
        // Calculate new current page to keep the first visible item the same
        const firstItemIndex = (currentPage - 1) * pageSize + 1
        const newCurrentPage = Math.max(1, Math.ceil(firstItemIndex / newPageSize))

        setPageSize(newPageSize)
        setCurrentPage(newCurrentPage)
    }

    // Handle page change
    const handlePageChange = (page: number) => {
        // Validate page number
        if (page < 1) {
            setCurrentPage(1)
        } else if (page > totalPages) {
            setCurrentPage(totalPages)
        } else {
            setCurrentPage(page)
        }
    }

    // Reset to page 1 when search term or sort changes
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, sortBy, sortDirection])

    // Show error toast if API call fails
    if (isError) {
        toast.error('Có lỗi xảy ra khi tải dữ liệu khối kiến thức')
    }

    return (
        <div className="container mx-auto py-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Quản lý khối kiến thức</h1>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        disabled={isLoading}
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Làm mới
                    </Button>
                    <Button className='bg-blue-700 text-white cursor-pointer hover:bg-blue-600 hover:text-white' onClick={() => setOpenAddDialog(true)}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Thêm khối kiến thức
                    </Button>
                </div>
            </div>

            {/* sperate dashboard  */}
            <DashBoardManagerBlockKnowledge
                totalBlocks={totalBlocks}
                totalKnowledges={totalKnowledges}
                emptyBlocks={emptyBlocks}
                avgKnowledgePerBlock={avgKnowledgePerBlock}
                filteredCount={filteredKnowledges.length}
                isLoading={isLoading}
            />

            <div className="bg-white rounded-lg shadow p-6">
                <Tabs defaultValue="all" className="w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <TabsList>
                            <TabsTrigger value="all">Tất cả khối kiến thức</TabsTrigger>
                            <TabsTrigger value="recent">Gần đây</TabsTrigger>
                        </TabsList>
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <div className="relative flex-grow">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    type="search"
                                    placeholder="Tìm kiếm khối kiến thức..."
                                    className="pl-8 w-full"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Select onValueChange={handleSortChange} defaultValue="idAsc">
                                    <SelectTrigger className="w-[160px]">
                                        <Filter className="h-4 w-4 mr-2" />
                                        <SelectValue placeholder="Sắp xếp" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="idAsc">ID tăng dần</SelectItem>
                                        <SelectItem value="idDesc">ID giảm dần</SelectItem>
                                        <SelectItem value="nameAsc">Tên A-Z</SelectItem>
                                        <SelectItem value="nameDesc">Tên Z-A</SelectItem>
                                        <SelectItem value="countAsc">Số kiến thức tăng</SelectItem>
                                        <SelectItem value="countDesc">Số kiến thức giảm</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <TabsContent value="all" className="mt-0">
                        <TableManagerBlockKnowledge
                            data={paginatedKnowledges}
                            isLoading={isLoading}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            refetchData={() => refetch()}
                            onPageSizeChange={handlePageSizeChange}
                            pageSize={pageSize}
                            totalItems={totalItems}
                        />
                    </TabsContent>

                    <TabsContent value="recent" className="mt-0">
                        {/* Hiển thị 5 mục mới nhất (theo ID nếu không có trường ngày tạo) */}
                        <TableManagerBlockKnowledge
                            data={sortedKnowledges.slice(0, 5)}
                            isLoading={isLoading}
                            currentPage={1}
                            totalPages={1}
                            onPageChange={() => { }}
                            refetchData={() => refetch()}
                            totalItems={Math.min(5, sortedKnowledges.length)}
                        />
                    </TabsContent>
                </Tabs>
            </div>

            <DialogAddManagerBlockKnowledge
                open={openAddDialog}
                onOpenChange={setOpenAddDialog}
                onSuccess={() => refetch()}
            />
        </div>
    )
}
