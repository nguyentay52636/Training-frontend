import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { CourseType } from '@/lib/apis/types'
import { createCourse, updateCourse } from '@/lib/apis/CourseApi'
import { Plus, Save } from 'lucide-react'

interface DialogAddManagerCourseProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    editingCourse: CourseType | null;
    onSuccess: () => void;
}

export default function DialogAddManagerCourse({
    open,
    onOpenChange,
    editingCourse,
    onSuccess
}: DialogAddManagerCourseProps) {
    const initEmptyCourse: CourseType = {
        maHP: '',
        tenHP: '',
        soTinChi: 0,
        soTietLyThuyet: 0,
        soTietThucHanh: 0,
        soTietThucTap: 0,
        loaiHocPhan: 'BẮT BUỘC',
        tongSoTiet: 0,
        heSoHocPhan: 1,
        hocKy: 1
    }

    const [formData, setFormData] = useState<CourseType>(initEmptyCourse)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Reset form when dialog opens/closes
        if (open) {
            setFormData(editingCourse || initEmptyCourse)
        }
    }, [open, editingCourse])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        // Convert numeric fields
        if (['soTinChi', 'soTietLyThuyet', 'soTietThucHanh', 'soTietThucTap', 'tongSoTiet', 'heSoHocPhan', 'hocKy'].includes(name)) {
            setFormData({
                ...formData,
                [name]: Number(value)
            })
        } else {
            setFormData({
                ...formData,
                [name]: value
            })
        }
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const calculateTotalHours = () => {
        const lyThuyet = formData.soTietLyThuyet || 0
        const thucHanh = formData.soTietThucHanh || 0
        const thucTap = formData.soTietThucTap || 0
        return lyThuyet + thucHanh + thucTap
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Calculate total hours before submitting
            const updatedFormData = {
                ...formData,
                tongSoTiet: calculateTotalHours()
            }

            if (editingCourse?.idHocPhan) {
                // Update existing course
                await updateCourse(editingCourse.idHocPhan, updatedFormData)
                toast.success('Cập nhật học phần thành công', {
                    description: 'Thông tin học phần đã được cập nhật'
                })
            } else {
                // Create new course
                await createCourse(updatedFormData)
                toast.success('Thêm học phần mới thành công', {
                    description: 'Học phần mới đã được thêm vào hệ thống'
                })
            }

            onSuccess()
            onOpenChange(false)
        } catch (error) {
            toast.error('Không thể lưu học phần', {
                description: 'Đã xảy ra lỗi. Vui lòng thử lại sau'
            })
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        {editingCourse ? 'Chỉnh sửa học phần' : 'Thêm học phần mới'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Mã HP */}
                        <div className="space-y-2">
                            <Label htmlFor="maHP">Mã học phần</Label>
                            <Input
                                id="maHP"
                                name="maHP"
                                placeholder="Nhập mã học phần"
                                value={formData.maHP || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Số tín chỉ */}
                        <div className="space-y-2">
                            <Label htmlFor="soTinChi">Số tín chỉ</Label>
                            <Input
                                id="soTinChi"
                                name="soTinChi"
                                type="number"
                                min="0"
                                value={formData.soTinChi || 0}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Tên HP */}
                    <div className="space-y-2">
                        <Label htmlFor="tenHP">Tên học phần</Label>
                        <Input
                            id="tenHP"
                            name="tenHP"
                            placeholder="Nhập tên học phần"
                            value={formData.tenHP || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {/* Số tiết lý thuyết */}
                        <div className="space-y-2">
                            <Label htmlFor="soTietLyThuyet">Số tiết lý thuyết</Label>
                            <Input
                                id="soTietLyThuyet"
                                name="soTietLyThuyet"
                                type="number"
                                min="0"
                                value={formData.soTietLyThuyet || 0}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Số tiết thực hành */}
                        <div className="space-y-2">
                            <Label htmlFor="soTietThucHanh">Số tiết thực hành</Label>
                            <Input
                                id="soTietThucHanh"
                                name="soTietThucHanh"
                                type="number"
                                min="0"
                                value={formData.soTietThucHanh || 0}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Số tiết thực tập */}
                        <div className="space-y-2">
                            <Label htmlFor="soTietThucTap">Số tiết thực tập</Label>
                            <Input
                                id="soTietThucTap"
                                name="soTietThucTap"
                                type="number"
                                min="0"
                                value={formData.soTietThucTap || 0}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Loại học phần */}
                        <div className="space-y-2">
                            <Label htmlFor="loaiHocPhan">Loại học phần</Label>
                            <Select
                                value={formData.loaiHocPhan}
                                onValueChange={(value) => handleSelectChange('loaiHocPhan', value)}
                            >
                                <SelectTrigger id="loaiHocPhan">
                                    <SelectValue placeholder="Chọn loại" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="BẮT BUỘC">Bắt buộc</SelectItem>
                                    <SelectItem value="TỰ CHỌN">Tự chọn</SelectItem>
                                    <SelectItem value="THỰC TẬP">Thực tập</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Hệ số học phần */}
                        <div className="space-y-2">
                            <Label htmlFor="heSoHocPhan">Hệ số học phần</Label>
                            <Input
                                id="heSoHocPhan"
                                name="heSoHocPhan"
                                type="number"
                                min="0"
                                step="0.1"
                                value={formData.heSoHocPhan || 1}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    {/* Học kỳ */}
                    <div className="space-y-2">
                        <Label htmlFor="hocKy">Học kỳ</Label>
                        <Input
                            id="hocKy"
                            name="hocKy"
                            type="number"
                            min="1"
                            max="10"
                            value={formData.hocKy || 1}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Tổng số tiết (readonly, calculated) */}
                    <div className="space-y-2">
                        <Label htmlFor="tongSoTiet">Tổng số tiết</Label>
                        <Input
                            id="tongSoTiet"
                            value={calculateTotalHours()}
                            readOnly
                            disabled
                            className="bg-gray-100"
                        />
                    </div>

                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Đang lưu...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    {editingCourse ? <Save className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                                    {editingCourse ? 'Lưu thay đổi' : 'Thêm mới'}
                                </div>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
