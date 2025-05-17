import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { DeCuongChiTiet, getAllDeCuongChiTietAPI } from '@/lib/apis/DeCuongChiTietApi'
import MucTieuDaoTaoTable from './components/MucTieuDaoTaoTable'
import DialogAddMucTieuDaoTao from './components/Dialog/DialogAddMucTieuDaoTao'
import DialogEditMucTieuDaoTao from './components/Dialog/DialogEditMucTieuDaoTao'

export default function MucTieuDaoTao() {
    const [data, setData] = useState<DeCuongChiTiet[]>([])
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<DeCuongChiTiet | null>(null)

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

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Mục tiêu đào tạo</h2>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm mục tiêu
                </Button>
            </div>

            <MucTieuDaoTaoTable
                data={data}
                onEdit={handleEdit}
                onRefresh={fetchData}
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
