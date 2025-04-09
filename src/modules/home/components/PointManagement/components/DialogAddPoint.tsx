import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddPointForm from "./AddPointForm";

export default function DialogAddPoint() {
    const [open, setOpen] = useState(false);

    const handleCloseDialog = (isOpen: boolean) => {
        if (!isOpen) {
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleCloseDialog}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-md px-6 py-2"
                >
                    <Plus className="mr-2 h-5 w-5" /> Thêm Sinh Viên
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1000px] rounded-xl p-0">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-blue-900 text-2xl font-bold">Thêm Điểm Sinh Viên</DialogTitle>
                    <DialogDescription className="text-gray-600 text-base">
                        Vui lòng nhập đầy đủ thông tin điểm số để thêm vào hệ thống.
                    </DialogDescription>
                </DialogHeader>
                <div className="p-6">
                    <AddPointForm onClose={handleCloseDialog} />
                </div>
            </DialogContent>
        </Dialog>
    );
}