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
} from "@/components/ui/dialog";

import PointAction from './PointAction';
import DialogViewDetailPoint from './DialogViewDetailPoint';

import { useEffect, useState } from 'react';
import { PointType } from '@/lib/apis/types';
import { getAllPoint } from '@/lib/apis/pointApi';
import UpdatePointForm from '../UpdatePointForm';

export default function PointTable() {
    const [points, setPoints] = useState<PointType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPoint, setSelectedPoint] = useState<PointType | null>(null);
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
    const [isViewDetailOpen, setIsViewDetailOpen] = useState(false);

    useEffect(() => {
        const fetchPoints = async () => {
            try {
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

        fetchPoints();
    }, []);

    const handleEdit = (point: PointType) => {
        setSelectedPoint(point);
        setIsUpdateDialogOpen(true);
    };

    const handleUpdateSuccess = () => {
        // Refresh the points list after successful update
        const fetchPoints = async () => {
            try {
                const data = await getAllPoint();
                if (data) {
                    setPoints(data);
                }
            } catch (error) {
                console.error('Error fetching points:', error);
            }
        };
        fetchPoints();
    };

    const handleViewDetail = (point: PointType) => {
        setSelectedPoint(point);
        setIsViewDetailOpen(true);
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
                        <TableRow className="hover:bg-muted/50 transition">
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{point.maSV}</TableCell>
                            <TableCell>{point.tenSV}</TableCell>
                            <TableCell>{point.diemChuyenCan}</TableCell>
                            <TableCell>{point.diemThucHanh}</TableCell>
                            <TableCell>{point.diemGiuaKy}</TableCell>
                            <TableCell>{point.diemCuoiKy}</TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <PointAction point={point} onEdit={handleEdit} onViewDetail={handleViewDetail} />
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
