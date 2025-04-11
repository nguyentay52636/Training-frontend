import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import khoiKienThucData from "../DataBlock";

export default function DialogAddBlockNow() {
    return (
        <>
            <Dialog>
                <DialogTrigger className="px-4 py-2 bg-blue-600 text-white rounded-md mx-10 cursor-pointer hover:bg-black">
                    Thêm khối kiến thức
                </DialogTrigger>
                <Button
                    variant="default"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Lưu
                </Button>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-[1.8rem]">Tên khối kiến thức</DialogTitle>
                        <DialogDescription className="text-[1rem]">
                            Nhập nội dung cho khối kiến thức bên dưới.
                        </DialogDescription>
                    </DialogHeader>

                    <Select>
                        <SelectTrigger className="w-full mt-4 h-12 text-[1.1rem] text-black!">
                            <SelectValue placeholder="Chọn tên khối kiến thức" />
                        </SelectTrigger>
                        <SelectContent>
                            {khoiKienThucData.map((khoiKienThuc) => (
                                <SelectItem
                                    key={khoiKienThuc.idKhoiKienThuc}
                                    value={String(khoiKienThuc.idKhoiKienThuc)}
                                >
                                    {khoiKienThuc.tenKhoiKienThuc}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

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
        </>
    );
}
