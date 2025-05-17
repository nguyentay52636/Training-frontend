import React, { useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DeCuongChiTiet, updateDeCuongChiTietAPI } from '@/lib/apis/DeCuongChiTietApi'
import { useState } from 'react'

interface DialogEditMucTieuDaoTaoProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: DeCuongChiTiet | null
    onSuccess: () => Promise<void>
}

export default function DialogEditMucTieuDaoTao({ open, onOpenChange, data, onSuccess }: DialogEditMucTieuDaoTaoProps) {
    const [mucTieu, setMucTieu] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (data) {
            setMucTieu(data.mucTieu)
        }
    }, [data])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!data?.id) return

        setIsLoading(true)
        try {
            await updateDeCuongChiTietAPI(data.id, { mucTieu })
            await onSuccess()
            onOpenChange(false)
        } catch (error) {
            console.error('Error updating item:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Sửa mục tiêu đào tạo</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Mục tiêu</label>
                        <Textarea
                            value={mucTieu}
                            onChange={(e) => setMucTieu(e.target.value)}
                            placeholder="Nhập mục tiêu đào tạo..."
                            className="min-h-[150px]"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Hủy
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
