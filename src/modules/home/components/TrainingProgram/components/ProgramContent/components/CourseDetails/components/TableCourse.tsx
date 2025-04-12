
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { hocPhanData } from './DataCourse';
import { Checkbox } from '@radix-ui/react-checkbox';


export default function TableCourse() {
    return (
        <div className="w-full p-4 bg-white rounded-xl shadow-md">
            <Table>
                <TableHeader>
                    <TableRow className="bg-blue-300">
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Chọn
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            STT
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Mã học phần
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Tên học phần
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Số tín chỉ
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Lý thuyết
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Thực hành
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Thực tập
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Tổng số tiết
                        </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-gray-700">
                            Loại
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {hocPhanData.map((hocPhan, index) => (
                        <TableRow key={hocPhan.maHP} className="hover:bg-muted/50 transition">
                            <TableCell className="font-medium">
                                <Checkbox className=" bg-black!" />
                            </TableCell>

                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{hocPhan.maHP}</TableCell>
                            <TableCell>{hocPhan.tenHP}</TableCell>
                            <TableCell>{hocPhan.soTinChi}</TableCell>
                            <TableCell>{hocPhan.soTietLyThuyet}</TableCell>
                            <TableCell>{hocPhan.soTietThucHanh}</TableCell>
                            <TableCell>{hocPhan.soTietThucTap}</TableCell>
                            <TableCell>{hocPhan.tongSoTiet}</TableCell>
                            <TableCell>{hocPhan.loaiHocPhan}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
