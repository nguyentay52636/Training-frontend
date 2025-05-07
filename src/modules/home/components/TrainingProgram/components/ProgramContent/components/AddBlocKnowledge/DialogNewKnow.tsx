import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from 'react-toastify';
import { addKnow } from "@/lib/apis/KnowsApi";
import { knowledgeType } from "@/lib/apis/types";

interface DialogNewKnowProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onKnowledgeCreated: (knowledge: knowledgeType) => void;
}

export default function DialogNewKnow({ open, onOpenChange, onKnowledgeCreated }: DialogNewKnowProps) {
    const [loading, setLoading] = useState(false);
    const [knowledgeName, setKnowledgeName] = useState("");
    const [loaiHocPhan, setLoaiHocPhan] = useState("bắt buộc");

    const showToast = (type: 'success' | 'error', message: string) => {
        const toastConfig = {
            position: "top-right" as const,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light" as const,
        };

        if (type === 'success') {
            toast.success(message, toastConfig);
        } else {
            toast.error(message, toastConfig);
        }
    };

    const handleCreateKnowledge = async () => {
        if (!knowledgeName.trim()) {
            showToast('error', "Vui lòng nhập tên kiến thức");
            return;
        }

        try {
            setLoading(true);
            const newKnowledge = await addKnow({
                tenKienThuc: knowledgeName.trim(),
                idHocPhan: [],
                loaiHocPhan: loaiHocPhan,
                hocPhanList: []
            });

            onKnowledgeCreated(newKnowledge);
            setKnowledgeName("");
            showToast('success', "Tạo kiến thức mới thành công");
            onOpenChange(false);
        } catch (error) {
            console.error("Error creating knowledge:", error);
            showToast('error', "Có lỗi xảy ra khi tạo kiến thức mới");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-[1.8rem]">Tạo kiến thức mới</DialogTitle>
                    <DialogDescription className="text-[1rem]">
                        Nhập thông tin kiến thức mới
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <Input
                        placeholder="Nhập tên kiến thức"
                        value={knowledgeName}
                        onChange={(e) => setKnowledgeName(e.target.value)}
                        disabled={loading}
                        className="h-12 text-[1.1rem]"
                    />
                    <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium">Loại học phần:</label>
                        <select
                            value={loaiHocPhan}
                            onChange={(e) => setLoaiHocPhan(e.target.value)}
                            className="border rounded-md px-3 py-2"
                        >
                            <option value="bắt buộc">Bắt buộc</option>
                            <option value="tự chọn">Tự chọn</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <Button
                        variant="default"
                        className="px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700"
                        onClick={handleCreateKnowledge}
                        disabled={loading}
                    >
                        {loading ? "Đang tạo..." : "Tạo mới"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
