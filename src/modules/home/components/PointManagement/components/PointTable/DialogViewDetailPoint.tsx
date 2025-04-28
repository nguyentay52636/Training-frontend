import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { PointType } from "@/lib/apis/types";

interface DialogViewDetailPointProps {
    point: PointType;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DialogViewDetailPoint({ point, open, onOpenChange }: DialogViewDetailPointProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] rounded-xl p-0">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-blue-900 text-2xl font-bold">Chi Tiết Điểm Sinh Viên</DialogTitle>
                    <DialogDescription className="text-gray-600 text-base">
                        Thông tin chi tiết về điểm số của sinh viên.
                    </DialogDescription>
                </DialogHeader>
                <div className="p-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Mã Sinh Viên</p>
                                <p className="text-base font-semibold">{point.maSV}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Họ và Tên</p>
                                <p className="text-base font-semibold">{point.tenSV}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Điểm Chuyên Cần</p>
                                <p className="text-base font-semibold">{point.diemChuyenCan}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Điểm Thực Hành</p>
                                <p className="text-base font-semibold">{point.diemThucHanh}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Điểm Giữa Kỳ</p>
                                <p className="text-base font-semibold">{point.diemGiuaKy}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Điểm Cuối Kỳ</p>
                                <p className="text-base font-semibold">{point.diemCuoiKy}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Bảng Điểm Môn</p>
                                <p className="text-base font-semibold">{point.bangDiemMon}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Học Kỳ</p>
                                <p className="text-base font-semibold">{point.hocKy}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Năm Học</p>
                                <p className="text-base font-semibold">{point.nam}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Lớp</p>
                                <p className="text-base font-semibold">{point.lop}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

