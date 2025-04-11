
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface DialogAddKnowLedgeProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DialogAddKnowLedge({ open, onOpenChange }: DialogAddKnowLedgeProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-[1.8rem]">Tên khối kiến thức</DialogTitle>
                    <DialogDescription className="text-[1rem]">
                        Nhập nội dung cho khối kiến thức bên dưới.
                    </DialogDescription>
                </DialogHeader>

                <Textarea
                    placeholder="Ví dụ: Lý luận chính trị"
                    className="mt-4 h-80 resize-none text-[1.5rem]"
                />

                <div className="flex justify-end mt-4">
                    <Button
                        variant="default"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Lưu
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
