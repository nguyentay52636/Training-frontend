import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { addDeCuongChiTietAPI } from '@/lib/apis/DeCuongChiTietApi'
import { getAllCourse } from '@/lib/apis/CourseApi'
import { CourseType } from '@/lib/apis/types'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DialogAddMucTieuDaoTaoProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => Promise<void>
}

export default function DialogAddMucTieuDaoTao({ open, onOpenChange, onSuccess }: DialogAddMucTieuDaoTaoProps) {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await addDeCuongChiTietAPI({
                mucTieu,
                idHocPhan: selectedCourseId ? parseInt(selectedCourseId) : undefined
            })
            await onSuccess()
            onOpenChange(false)
            setMucTieu('')
            setSelectedCourseId('')
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
                            className='bg-red-600 hover:bg-red-700 cursor-pointer'
                            onClick={() => onOpenChange(false)}
                        >
                            Hủy
                        </Button>
                        <Button className='bg-blue-700 cursor-pointer hover:bg-blue-700' type="submit" disabled={isLoading}>
                            {isLoading ? 'Đang thêm...' : 'Thêm'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
