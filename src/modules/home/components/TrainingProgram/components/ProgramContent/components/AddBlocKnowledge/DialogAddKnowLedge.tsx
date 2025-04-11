
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import khoiKienThucData from "../DataBlock";

interface DialogAddKnowLedgeProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DialogAddKnowLedge({ open, onOpenChange }: DialogAddKnowLedgeProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-[1.8rem]">Tên kiến thức</DialogTitle>
                    <DialogDescription className="text-[1.2rem]">
                        Nhập nội dung cho khối kiến thức bên dưới.
                    </DialogDescription>
                </DialogHeader>
                <Select>
                    <SelectTrigger className="w-full mt-4 h-12 text-[1.1rem] text-black!">
                        <SelectValue placeholder="Chọn tên khối kiến thức" />
                    </SelectTrigger>
                    <SelectContent>
                        {khoiKienThucData.flatMap((khoi) => khoi.hocPhanList.map((hocPhan) => (
                            <SelectItem key={hocPhan.maHP} value={hocPhan.maHP}>
                                {hocPhan.tenHP}
                            </SelectItem>
                        )))}
                    </SelectContent>
                </Select>


                <div className="flex justify-end mt-4">
                    <Button
                        variant="default"
                        className=" cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Lưu
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
