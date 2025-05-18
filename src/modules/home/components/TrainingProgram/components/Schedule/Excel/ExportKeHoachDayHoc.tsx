import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDownToLine } from 'lucide-react';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

interface ExportKeHoachDayHocProps {
    data: any[];
    tenChuyenNganh: string;
}

export default function ExportKeHoachDayHoc({ data, tenChuyenNganh }: ExportKeHoachDayHocProps) {
    const handleExport = () => {
        try {
            // Transform data for Excel
            const excelData = data.map((item) => ({
                'Mã học phần': item.maHP,
                'Tên học phần': item.tenHP,
                'Số tín chỉ': item.soTinChi,
                'Số tiết lý thuyết': item.soTietLyThuyet,
                'Số tiết thực hành': item.soTietThucHanh,
                'Số tiết thực tập': item.soTietThucTap,
                'Tổng số tiết': item.tongSoTiet,
                'Loại học phần': item.loaiHocPhan === 0 ? 'Bắt buộc' : 'Tự chọn',
                'Hệ số học phần': item.heSoHocPhan,
            }));

            // Create worksheet
            const ws = XLSX.utils.json_to_sheet(excelData);

            // Create workbook
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Kế hoạch dạy học');

            // Generate Excel file
            XLSX.writeFile(wb, `KeHoachDayHoc_${tenChuyenNganh}.xlsx`);

            toast.success('Xuất Excel thành công!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            toast.error('Có lỗi xảy ra khi xuất Excel!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <Button
            onClick={handleExport}
            className='bg-green-700 rounded-xl cursor-pointer hover:bg-green-800'
        >
            <ArrowDownToLine className="mr-2 h-4 w-4" /> Xuất Excel
        </Button>
    );
}
