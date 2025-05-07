import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { addBlockKnow } from "@/lib/apis/blockKnowApi";
import { BlockKnowType } from "@/lib/apis/types";
import { toast } from 'react-toastify';

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

export default function DialogAddBlockNow() {
    const [tenKhoiKienThuc, setTenKhoiKienThuc] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSave = async () => {
        if (!tenKhoiKienThuc.trim()) {
            showToast('error', "Vui lòng nhập tên khối kiến thức");
            return;
        }

        try {
            setLoading(true);
            const newBlockKnow: BlockKnowType = {
                tenKhoiKienThuc,
                idKienThuc: [],
                kienThucList: []
            };

            await addBlockKnow(newBlockKnow);
            showToast('success', "Thêm khối kiến thức thành công");
            setTenKhoiKienThuc(""); // Reset form
            setOpen(false); // Close dialog
        } catch (error) {
            console.error("Error adding block knowledge:", error);
            showToast('error', "Có lỗi xảy ra khi thêm khối kiến thức");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md mx-10 cursor-pointer hover:bg-black">
                    Thêm khối kiến thức
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-[1.8rem]">Tên khối kiến thức</DialogTitle>
                        <DialogDescription className="text-[1rem]">
                            Nhập tên cho khối kiến thức mới.
                        </DialogDescription>
                    </DialogHeader>

                    <Input
                        className="w-full mt-4 h-12 text-[1.1rem]"
                        placeholder="Nhập tên khối kiến thức"
                        value={tenKhoiKienThuc}
                        onChange={(e) => setTenKhoiKienThuc(e.target.value)}
                    />

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
        </>
    );
}
