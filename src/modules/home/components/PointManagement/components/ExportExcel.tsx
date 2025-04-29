import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from 'xlsx';
import { PointType } from "@/lib/apis/types";
import { toast } from 'react-toastify';

interface ExportExcelProps {
    points: PointType[];
}

export default function ExportExcel({ points }: ExportExcelProps) {
    const exportToExcel = () => {
        try {
            // Chuẩn bị dữ liệu cho Excel
            const excelData = points.map((point, index) => ({
                'STT': index + 1,
                'Mã Sinh Viên': point.maSV,
                'Họ và Tên': point.tenSV,
                'Điểm Chuyên Cần': point.diemChuyenCan,
                'Điểm Thực Hành': point.diemThucHanh,
                'Điểm Giữa Kỳ': point.diemGiuaKy,
                'Điểm Cuối Kỳ': point.diemCuoiKy,
                'Bảng Điểm Môn': point.bangDiemMon,
                'Học Kỳ': point.hocKy,
                'Năm Học': point.nam,
                'Lớp': point.lop
            }));

            // Tạo workbook và worksheet
            const ws = XLSX.utils.json_to_sheet(excelData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Danh sách điểm");

            // Điều chỉnh độ rộng cột
            const wscols = [
                { wch: 5 },  // STT
                { wch: 15 }, // Mã SV
                { wch: 30 }, // Họ và Tên
                { wch: 15 }, // Điểm Chuyên Cần
                { wch: 15 }, // Điểm Thực Hành
                { wch: 15 }, // Điểm Giữa Kỳ
                { wch: 15 }, // Điểm Cuối Kỳ
                { wch: 15 }, // Bảng Điểm Môn
                { wch: 10 }, // Học Kỳ
                { wch: 15 }, // Năm Học
                { wch: 15 }  // Lớp
            ];
            ws['!cols'] = wscols;

            // Xuất file
            XLSX.writeFile(wb, "Danh_sach_diem.xlsx");

            // Hiển thị thông báo thành công
            toast.success('Xuất Excel thành công!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            // Hiển thị thông báo lỗi nếu có
            toast.error('Có lỗi xảy ra khi xuất Excel!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <Button 
            onClick={exportToExcel}
            className="bg-green-700 hover:bg-green-800 text-white rounded-full shadow-md transition-all duration-200 flex items-center justify-center"
        >
            <Download className="mr-2 h-4 w-4" />
            Xuất Excel
        </Button>
    );
} 