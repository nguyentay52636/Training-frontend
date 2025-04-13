// TableCourse.tsx
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

interface TableCourseProps {
    onRowClick?: (courseId: string) => void;
}

export default function TableCourse({ onRowClick }: TableCourseProps) {
    return (
        <div className="w-full p-4 bg-white rounded-xl shadow-md">
            <Table>
                <TableHeader>
                    <TableRow className=" bg-indigo-600 text-white!">
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Chọn</TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">STT</TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Mã học phần</TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Tên học phần</TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Số tín chỉ</TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Lý thuyết</TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Thực hành</TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Thực tập</TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Tổng số tiết</TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Loại</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {hocPhanData.map((hocPhan, index) => (
                        <TableRow
                            key={hocPhan.maHP}
                            onClick={() => onRowClick?.(hocPhan.maHP)}
                            className="hover:bg-gray-100 transition cursor-pointer"
                        >
                            <TableCell>
                                <Checkbox className=" bg-black" />
                            </TableCell>
                            <TableCell>{index + 1}</TableCell>
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
