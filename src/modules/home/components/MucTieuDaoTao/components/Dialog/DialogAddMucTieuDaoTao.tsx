import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { addDeCuongChiTietAPI } from '@/lib/apis/DeCuongChiTietApi'
import { useState } from 'react'

interface DialogAddMucTieuDaoTaoProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => Promise<void>
}

export default function DialogAddMucTieuDaoTao({ open, onOpenChange, onSuccess }: DialogAddMucTieuDaoTaoProps) {
    const [mucTieu, setMucTieu] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await addDeCuongChiTietAPI({ mucTieu })
            await onSuccess()
            onOpenChange(false)
            setMucTieu('')
        } catch (error) {
            console.error('Error adding item:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Thêm mục tiêu đào tạo</DialogTitle>
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
                            {isLoading ? 'Đang thêm...' : 'Thêm'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
