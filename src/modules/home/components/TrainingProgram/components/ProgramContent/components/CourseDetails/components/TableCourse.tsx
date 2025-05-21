// TableCourse.tsx
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { Checkbox } from '@radix-ui/react-checkbox';
import { useEffect, useState } from 'react';
import { getKnowledgeById } from '@/lib/apis/KnowsApi';
import { getLoaiHocPhanDisplay } from '@/lib/utils/courseHelpers';
import ToastContainer from '@/components/ToastContainer';

interface CourseType {
    idHocPhan?: number;
    maHP: string;
    tenHP: string;
    soTinChi: number;
    soTietLyThuyet: number;
    soTietThucHanh: number;
    soTietThucTap: number;
    tongSoTiet: number;
    loaiHocPhan: string | number;
    heSoHocPhan?: number;
}

interface KnowledgeType {
    idKienThuc: number;
    tenKienThuc: string;
    idHocPhan: number[];
    loaiHocPhan: string;
    hocPhanList: CourseType[];
}

interface TableCourseProps {
    onRowClick?: (courseId: string) => void;
    courseData?: CourseType[];
    knowledgeId?: number;
}

export default function TableCourse({ onRowClick, courseData = [], knowledgeId }: TableCourseProps) {
    const [loadedCourses, setLoadedCourses] = useState<CourseType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            if (!knowledgeId) return;

            try {
                setLoading(true);
                setError(null);
                const data = await getKnowledgeById(knowledgeId);
                if (data && data.hocPhanList) {
                    setLoadedCourses(data.hocPhanList);
                    console.log("Loaded courses:", data.hocPhanList);
                }
            } catch (err) {
                console.error("Error fetching courses:", err);
                setError("Không thể tải danh sách học phần");
            } finally {
                setLoading(false);
            }
        };

        if (knowledgeId && courseData.length === 0) {
            fetchCourses();
        }
    }, [knowledgeId, courseData.length]);

    // Use provided courseData if available, otherwise use the loaded data
    const displayData = courseData.length > 0 ? courseData : loadedCourses;

    if (loading) {
        return <div className="w-full p-4 bg-white rounded-xl text-center py-8">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div className="w-full p-4 bg-white rounded-xl text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <div className="w-full p-4 bg-white rounded-xl">
            <Table>
                <TableHeader>
                    <TableRow className="bg-indigo-600 text-white! hover:bg-indigo-600!">
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
                    {displayData.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                                <div className="text-center">
                                    <p className="text-lg mb-2">Không có học phần nào</p>
                                    <p className="text-sm">Vui lòng thêm học phần vào kiến thức này</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        displayData.map((hocPhan: CourseType, index: number) => (
                            <TableRow
                                key={hocPhan.idHocPhan || index}
                                onClick={() => onRowClick?.(hocPhan.maHP || hocPhan.idHocPhan?.toString() || '')}
                                className="hover:bg-gray-100 transition cursor-pointer"
                            >
                                <TableCell>
                                    <Checkbox className="bg-black" />
                                </TableCell>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{hocPhan.maHP}</TableCell>
                                <TableCell>{hocPhan.tenHP}</TableCell>
                                <TableCell>{hocPhan.soTinChi}</TableCell>
                                <TableCell>{hocPhan.soTietLyThuyet}</TableCell>
                                <TableCell>{hocPhan.soTietThucHanh}</TableCell>
                                <TableCell>{hocPhan.soTietThucTap}</TableCell>
                                <TableCell>{hocPhan.tongSoTiet}</TableCell>
                                <TableCell>
                                    {getLoaiHocPhanDisplay(hocPhan.loaiHocPhan)}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <ToastContainer />
        </div>
    );
}
