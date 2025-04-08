import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { pointData } from './dataPoint';
import PointAction from './PointAction';

export default function PointTable() {
    return (
        <div className="w-full p-4 bg-white rounded-xl shadow-md">
            <Table>
                <TableHeader>
                    <TableRow className="bg-blue-300">
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            STT
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Mã sinh viên
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Họ và tên
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Chuyên cần
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Thực hành
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Giữa kỳ
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Cuối kỳ
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-center text-gray-700">
                            Hành động
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pointData.map((point, index) => (
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
