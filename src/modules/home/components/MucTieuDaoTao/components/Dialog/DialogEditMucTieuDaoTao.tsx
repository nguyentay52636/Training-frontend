import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { DeCuongChiTiet, updateDeCuongChiTietAPI } from '@/lib/apis/DeCuongChiTietApi'
import { getAllCourse } from '@/lib/apis/CourseApi'
import { CourseType } from '@/lib/apis/types'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DialogEditMucTieuDaoTaoProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    data: DeCuongChiTiet | null
    onSuccess: () => Promise<void>
}

export default function DialogEditMucTieuDaoTao({ open, onOpenChange, data, onSuccess }: DialogEditMucTieuDaoTaoProps) {
    const [mucTieu, setMucTieu] = useState('')
    const [selectedCourseId, setSelectedCourseId] = useState<string>('')
    const [courses, setCourses] = useState<CourseType[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getAllCourse()
                setCourses(data)
            } catch (error) {
                console.error('Error fetching courses:', error)
            }
        }
        fetchCourses()
    }, [])

    useEffect(() => {
        if (data) {
            setMucTieu(data.mucTieu)
            setSelectedCourseId(data.idHocPhan ? data.idHocPhan.toString() : '')
        }
    }, [data])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!data?.id) return
        setIsLoading(true)
        try {
            await updateDeCuongChiTietAPI(data.id, {
                mucTieu,
                idHocPhan: selectedCourseId ? parseInt(selectedCourseId) : undefined
            })
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
                        <label className="text-sm font-medium">Học phần</label>
                        <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn học phần" />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((course) => (
                                    <SelectItem key={course.idHocPhan} value={course.idHocPhan?.toString() || ''}>
                                        {course.maHP} - {course.tenHP}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
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
                            className='hover:text-white bg-red-600 cursor-pointer text-white hover:bg-red-600'
                            onClick={() => onOpenChange(false)}
                        >
                            Hủy
                        </Button>
                        <Button type="submit" disabled={isLoading} className='bg-blue-700 hover:bg-blue-800  cursor-pointer'>
                            {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
