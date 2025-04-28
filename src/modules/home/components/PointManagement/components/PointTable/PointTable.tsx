import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import PointAction from './PointAction';
import { useEffect, useState } from 'react';
import { PointType } from '@/lib/apis/types';
import { getAllPoint } from '@/lib/apis/pointApi';

export default function PointTable() {
    const [points, setPoints] = useState<PointType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const data = await getAllPoint();
                setPoints(data);
            } catch (error) {
                console.error('Error fetching points:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPoints();
    }, []);

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
                        <TableRow key={point.idCotDiem} className="hover:bg-muted/50 transition">
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{point.maSV}</TableCell>
                            <TableCell>{point.tenSV}</TableCell>
                            <TableCell>{point.diemChuyenCan}</TableCell>
                            <TableCell>{point.diemThucHanh}</TableCell>
                            <TableCell>{point.diemGiuaKy}</TableCell>
                            <TableCell>{point.diemCuoiKy}</TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <PointAction />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
