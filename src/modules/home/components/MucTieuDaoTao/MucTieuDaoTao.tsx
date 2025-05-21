import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DeCuongChiTiet, getAllDeCuongChiTietAPI } from '@/lib/apis/DeCuongChiTietApi'
import MucTieuDaoTaoTable from './components/MucTieuDaoTaoTable'
import DialogAddMucTieuDaoTao from './components/Dialog/DialogAddMucTieuDaoTao'
import DialogEditMucTieuDaoTao from './components/Dialog/DialogEditMucTieuDaoTao'
import PaginationMucTieuDaoTao from './components/PaginationMucTieuDaoTao'

export default function MucTieuDaoTao() {
    const [data, setData] = useState<DeCuongChiTiet[]>([])
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<DeCuongChiTiet | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const fetchData = async () => {
        try {
            const response = await getAllDeCuongChiTietAPI()
            setData(response)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleEdit = (item: DeCuongChiTiet) => {
        setSelectedItem(item)
        setIsEditDialogOpen(true)
    }

    // Calculate pagination values
    const totalItems = data.length
    const totalPages = Math.ceil(totalItems / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentData = data.slice(startIndex, endIndex)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows)
        setCurrentPage(1)
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Đề cương chi tiết</h2>
                <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="bg-blue-700 hover:bg-blue-800 text-white"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm đề cương chi tiết
                </Button>
            </div>

            <MucTieuDaoTaoTable
                data={currentData}
                onEdit={handleEdit}
                onRefresh={fetchData}
            />

            <PaginationMucTieuDaoTao
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                totalItems={totalItems}
            />

            <DialogAddMucTieuDaoTao
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onSuccess={fetchData}
            />

            <DialogEditMucTieuDaoTao
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                data={selectedItem}
                onSuccess={fetchData}
            />
        </div>
    )
}
