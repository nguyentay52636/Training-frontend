
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';



export default function TableTeachingSchedule() {
    return (
        <div className="w-full p-4 bg-white rounded-xl shadow-md">
            <Table>
                <TableHeader>
                    <TableRow className=" bg-indigo-600! text-white">
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">
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
                    {/* {pointData.map((point, index) => (
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
                    ))} */}
                </TableBody>
            </Table>
        </div>
    );
}
