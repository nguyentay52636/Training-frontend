import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
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
import { knowledgeType } from '@/lib/apis/types'
import { addKnow, updateKnowByCourse } from '@/lib/apis/KnowsApi'

interface DialogAddManagerKnowledgeProps {
    isOpen: boolean
    onClose: () => void
    editingKnowledge: knowledgeType | null
}

export default function DialogAddManagerKnowledge({
    isOpen,
    onClose,
    editingKnowledge
}: DialogAddManagerKnowledgeProps) {
    const initialFormState: knowledgeType = {
        tenKienThuc: '',
        idHocPhan: [],
        loaiHocPhan: 'BẮT BUỘC',
        hocPhanList: []
    }

    const [formData, setFormData] = useState<knowledgeType>(initialFormState)
    const [loading, setLoading] = useState(false)

    // Set form data when editing
    useEffect(() => {
        if (editingKnowledge) {
            setFormData({
                ...editingKnowledge,
                idHocPhan: editingKnowledge.idHocPhan || []
            })
        } else {
            setFormData(initialFormState)
        }
    }, [editingKnowledge, isOpen])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSelectChange = (value: string) => {
        setFormData({
            ...formData,
            loaiHocPhan: value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.tenKienThuc.trim()) {
            toast.error('Vui lòng nhập tên kiến thức', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            return
        }

        try {
            setLoading(true)

            if (editingKnowledge?.idKienThuc) {
                // Update existing knowledge
                await updateKnowByCourse(
                    editingKnowledge.idKienThuc,
                    {
                        tenKienThuc: formData.tenKienThuc,
                        idHocPhan: formData.idHocPhan,
                        loaiHocPhan: formData.loaiHocPhan
                    }
                )
                toast.success('Cập nhật kiến thức thành công', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            } else {
                // Add new knowledge
                await addKnow({
                    tenKienThuc: formData.tenKienThuc,
                    idHocPhan: formData.idHocPhan,
                    loaiHocPhan: formData.loaiHocPhan,
                    hocPhanList: []
                })
                toast.success('Thêm kiến thức mới thành công', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            }

            setLoading(false)
            onClose()
            // Reload the page to refresh data
            window.location.reload()
        } catch (error) {
            toast.error(editingKnowledge ? 'Không thể cập nhật kiến thức' : 'Không thể thêm kiến thức mới', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        {editingKnowledge ? 'Chỉnh sửa kiến thức' : 'Thêm kiến thức mới'}
                    </DialogTitle>
                </DialogHeader>

                <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                    {/* Tên kiến thức */}
                    <div className="space-y-2">
                        <Label htmlFor="tenKienThuc">Tên kiến thức</Label>
                        <Input
                            id="tenKienThuc"
                            name="tenKienThuc"
                            placeholder="Nhập tên kiến thức"
                            value={formData.tenKienThuc || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Loại học phần */}
                    <div className="space-y-2">
                        <Label htmlFor="loaiHocPhan">Loại học phần</Label>
                        <Select
                            value={formData.loaiHocPhan}
                            onValueChange={handleSelectChange}
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

                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
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
                                    {editingKnowledge ? 'Đang cập nhật...' : 'Đang lưu...'}
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    {editingKnowledge ? 'Cập nhật' : 'Thêm mới'}
                                </div>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
