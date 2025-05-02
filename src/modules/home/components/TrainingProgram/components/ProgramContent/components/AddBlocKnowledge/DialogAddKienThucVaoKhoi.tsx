import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { knowledgeType } from "@/lib/apis/types";
import {  addKnowInBlockKnow } from "@/lib/apis/blockKnowApi";
import { getKnows } from "@/lib/apis/KnowsApi";
import { X } from "lucide-react";
import DialogNewKnow from "./DialogNewKnow";

interface DialogAddKienThucVaoKhoiProps {
    blockKnowId: number;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdateSuccess?: () => void;
}

interface SelectedKnowledge {
    id: number;
    name: string;
}

export default function DialogAddKienThucVaoKhoi({ blockKnowId, open, onOpenChange, onUpdateSuccess }: DialogAddKienThucVaoKhoiProps) {
    const [selectedKnowledge, setSelectedKnowledge] = useState<SelectedKnowledge[]>([]);
    const [loading, setLoading] = useState(false);
    const [availableKnowledge, setAvailableKnowledge] = useState<knowledgeType[]>([]);
    const [selectValue, setSelectValue] = useState<string>("");
    const [isNewKnowDialogOpen, setIsNewKnowDialogOpen] = useState(false);

    useEffect(() => {
        const fetchKnowledge = async () => {
            try {
                const data = await getKnows();
                setAvailableKnowledge(data);
            } catch (error) {
                console.error("Error fetching knowledge:", error);
                showToast('error', "Có lỗi xảy ra khi tải danh sách kiến thức");
            }
        };

        if (open) {
            fetchKnowledge();
            setSelectedKnowledge([]); // Reset selection when dialog opens
        }
    }, [open]);

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

    const handleSelect = (value: string) => {
        const knowledge = availableKnowledge.find(k => k.idKienThuc?.toString() === value);
        if (knowledge && !selectedKnowledge.some(k => k.id === knowledge.idKienThuc)) {
            const newSelected = [...selectedKnowledge, {
                id: knowledge.idKienThuc!,
                name: knowledge.tenKienThuc
            }];
            setSelectedKnowledge(newSelected);
            console.log("Selected knowledge IDs:", newSelected.map(k => k.id).join(','));
            setSelectValue("");
        }
    };

    const handleRemove = (id: number) => {
        const newSelected = selectedKnowledge.filter(k => k.id !== id);
        setSelectedKnowledge(newSelected);
        console.log("After remove, selected IDs:", newSelected.map(k => k.id).join(','));
    };

    const handleNewKnowledgeCreated = (newKnowledge: knowledgeType) => {
        setAvailableKnowledge([...availableKnowledge, newKnowledge]);
        const newSelected = [...selectedKnowledge, {
            id: newKnowledge.idKienThuc!,
            name: newKnowledge.tenKienThuc
        }];
        setSelectedKnowledge(newSelected);
        console.log("After adding new knowledge, selected IDs:", newSelected.map(k => k.id).join(','));
    };

    const handleSave = async () => {
        if (selectedKnowledge.length === 0) {
            showToast('error', "Vui lòng chọn ít nhất một kiến thức");
            return;
        }

        try {
            setLoading(true);
            
            // Add each selected knowledge to the block
            for (const knowledge of selectedKnowledge) {
                await addKnowInBlockKnow(blockKnowId, knowledge.id);
            }
            
            showToast('success', "Cập nhật kiến thức thành công");
            setSelectedKnowledge([]); // Reset selection
            onOpenChange(false); // Close dialog
            
            // Call the callback to refresh the table
            if (onUpdateSuccess) {
                onUpdateSuccess();
            }
        } catch (error) {
            console.error("Error updating knowledge:", error);
            showToast('error', "Có lỗi xảy ra khi cập nhật kiến thức");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-[1.8rem]">Thêm kiến thức vào khối</DialogTitle>
                        <DialogDescription className="text-[1rem]">
                            Chọn kiến thức để thêm vào khối hoặc tạo mới.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Select
                                value={selectValue}
                                onValueChange={handleSelect}
                            >
                                <SelectTrigger className="w-full h-12 text-[1.1rem] text-black!">
                                    <SelectValue placeholder="Chọn kiến thức có sẵn" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableKnowledge
                                        .filter(k => !selectedKnowledge.some(s => s.id === k.idKienThuc))
                                        .map((knowledge) => (
                                            <SelectItem
                                                key={knowledge.idKienThuc}
                                                value={knowledge.idKienThuc?.toString() || ''}
                                            >
                                                {knowledge.tenKienThuc}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <Button
                                variant="outline"
                                className="ml-4"
                                onClick={() => setIsNewKnowDialogOpen(true)}
                            >
                                Tạo mới
                            </Button>
                        </div>
                    </div>

                    {selectedKnowledge.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Kiến thức đã chọn: ({selectedKnowledge.map(k => k.id).join(',')})</h3>
                            <div className="space-y-2">
                                {selectedKnowledge.map((knowledge) => (
                                    <div
                                        key={`selected-${knowledge.id}`}
                                        className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
                                    >
                                        <span>{knowledge.name}</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemove(knowledge.id)}
                                            className="hover:bg-gray-200"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end mt-4">
                        <Button
                            variant="default"
                            className="px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700"
                            onClick={handleSave}
                            disabled={loading}
                        >
                            {loading ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <DialogNewKnow
                open={isNewKnowDialogOpen}
                onOpenChange={setIsNewKnowDialogOpen}
                onKnowledgeCreated={handleNewKnowledgeCreated}
            />
        </>
    );
}
