import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import PointAction from './PointAction';
import DialogViewDetailPoint from './DialogViewDetailPoint';

import { useEffect, useState } from 'react';
import { PointType } from '@/lib/apis/types';
import { getAllPoint, deletePoint } from '@/lib/apis/pointApi';
import UpdatePointForm from '../UpdatePointForm';
import { toast } from 'sonner';

export default function PointTable() {
    const [points, setPoints] = useState<PointType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPoint, setSelectedPoint] = useState<PointType | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [isViewDetailOpen, setIsViewDetailOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [pointToDelete, setPointToDelete] = useState<PointType | null>(null);

    const fetchPoints = async () => {
        try {
            setLoading(true);
            const data = await getAllPoint();
            if (data) {
                setPoints(data);
            }
        } catch (error) {
            console.error('Error fetching points:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPoints();
    }, []);

    const handleEdit = (point: PointType) => {
        setSelectedPoint(point);
        setIsUpdateDialogOpen(true);
    };

    const handleUpdateSuccess = () => {
        if (selectedPoint) {
            setPoints(prevPoints => {
                const index = prevPoints.findIndex(p => p.maSV === selectedPoint.maSV);
                if (index !== -1) {
                    const newPoints = [...prevPoints];
                    newPoints[index] = selectedPoint;
                    return newPoints;
                } else {
                    return [selectedPoint, ...prevPoints];
                }
            });
        }
        setIsUpdateDialogOpen(false);
    };

    const handleViewDetail = (point: PointType) => {
        setSelectedPoint(point);
        setIsViewDetailOpen(true);
    };

    const handleDeleteClick = (point: PointType) => {
        setPointToDelete(point);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!pointToDelete?.idCotDiem) {
            toast.error('Không tìm thấy ID điểm cần xóa');
            return;
        }

        try {
            const response = await deletePoint(pointToDelete.idCotDiem);
            if (response) {
                setPoints(prevPoints => prevPoints.filter(p => p.idCotDiem !== pointToDelete.idCotDiem));
                toast.success(`Đã xóa điểm của sinh viên ${pointToDelete.tenSV} (${pointToDelete.maSV}) thành công!`);
            }
        } catch (error: any) {
            toast.error(error.message || 'Có lỗi xảy ra khi xóa điểm');
        } finally {
            setIsDeleteDialogOpen(false);
            setPointToDelete(null);
        }
    };

    if (loading) {
        return <div className="w-full p-4 text-center">Loading...</div>;
    }

    return (
        <div className="w-full p-4 bg-white rounded-xl shadow-md">
            <Table>
                <TableHeader>
                    <TableRow className="bg-indigo-600 text-white!">
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white">
                            STT
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">
                            Mã sinh viên
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">
                            Họ và tên
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">
                            Chuyên cần
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">
                            Thực hành
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">
                            Giữa kỳ
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">
                            Cuối kỳ
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-center text-white!">
                            Hành động
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {points.map((point, index) => (
                        <TableRow key={point.maSV} className="hover:bg-muted/50 transition">
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{point.maSV}</TableCell>
                            <TableCell>{point.tenSV}</TableCell>
                            <TableCell>{point.diemChuyenCan}</TableCell>
                            <TableCell>{point.diemThucHanh}</TableCell>
                            <TableCell>{point.diemGiuaKy}</TableCell>
                            <TableCell>{point.diemCuoiKy}</TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <PointAction
                                        point={point}
                                        onEdit={handleEdit}
                                        onViewDetail={handleViewDetail}
                                        onDelete={handleDeleteClick}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Update Point Dialog */}
            <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                <DialogContent className="sm:max-w-[1000px] rounded-xl p-0">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-blue-900 text-2xl font-bold">Cập nhật Điểm Sinh Viên</DialogTitle>
                        <DialogDescription className="text-gray-600 text-base">
                            Vui lòng cập nhật thông tin điểm số cho sinh viên.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-6">
                        {selectedPoint && (
                            <UpdatePointForm
                                point={selectedPoint}
                                onClose={setIsUpdateDialogOpen}
                                onUpdateSuccess={handleUpdateSuccess}
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-red-600 text-xl font-bold">Xác nhận xóa</DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Bạn có chắc chắn muốn xóa điểm của sinh viên {pointToDelete?.tenSV} ({pointToDelete?.maSV})?
                            Hành động này không thể hoàn tác.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2 justify-end mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="border-gray-300 hover:bg-gray-100"
                        >
                            Hủy
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {selectedPoint && (
                <DialogViewDetailPoint
                    point={selectedPoint}
                    open={isViewDetailOpen}
                    onOpenChange={setIsViewDetailOpen}
                />
            )}
        </div>
    );
}
