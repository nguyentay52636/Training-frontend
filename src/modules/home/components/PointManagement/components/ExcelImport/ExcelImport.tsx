import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import { PointType } from '@/lib/apis/types';

interface ExcelImportProps {
    onImportSuccess: (importedPoints: PointType[]) => void;
}

export default function ExcelImport({ onImportSuccess }: ExcelImportProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Check file extension
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
            toast.error('Vui lòng chọn file Excel (.xlsx hoặc .xls)');
            return;
        }

        setIsLoading(true);

        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = e.target?.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);

                    // Validate data structure
                    const validData = jsonData.filter((row: any) => {
                        return row.maSV && row.tenSV &&
                            row.diemChuyenCan !== undefined &&
                            row.diemThucHanh !== undefined &&
                            row.diemGiuaKy !== undefined &&
                            row.diemCuoiKy !== undefined &&
                            row.bangDiemMon &&
                            row.hocKy !== undefined &&
                            row.nam &&
                            row.lop;
                    });

                    if (validData.length === 0) {
                        toast.error('File Excel không đúng định dạng hoặc không có dữ liệu hợp lệ');
                        return;
                    }

                    // Convert to PointType
                    const importedPoints: PointType[] = validData.map((row: any) => ({
                        maSV: String(row.maSV),
                        tenSV: String(row.tenSV),
                        diemChuyenCan: Number(row.diemChuyenCan),
                        diemThucHanh: Number(row.diemThucHanh),
                        diemGiuaKy: Number(row.diemGiuaKy),
                        diemCuoiKy: Number(row.diemCuoiKy),
                        bangDiemMon: String(row.bangDiemMon),
                        hocKy: Number(row.hocKy),
                        nam: String(row.nam),
                        lop: String(row.lop)
                    }));

                    // Check for duplicates
                    const duplicatePoints = importedPoints.filter((point, index) => {
                        return importedPoints.findIndex(p =>
                            p.maSV === point.maSV &&
                            p.bangDiemMon === point.bangDiemMon &&
                            p.hocKy === point.hocKy &&
                            p.nam === point.nam
                        ) !== index;
                    });

                    if (duplicatePoints.length > 0) {
                        toast.error(`Phát hiện ${duplicatePoints.length} bản ghi trùng lặp trong file Excel`);
                        return;
                    }

                    onImportSuccess(importedPoints);
                    toast.success('Nhập Excel thành công!');
                } catch (error) {
                    console.error('Error processing Excel file:', error);
                    toast.error('Có lỗi xảy ra khi xử lý file Excel');
                }
            };

            reader.onerror = () => {
                toast.error('Có lỗi xảy ra khi đọc file');
            };

            reader.readAsBinaryString(file);
        } catch (error) {
            console.error('Error reading file:', error);
            toast.error('Có lỗi xảy ra khi đọc file');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                id="excel-upload"
            />
            <Button
                variant="outline"
                className="bg-green-700 hover:text-white cursor-pointer  hover:bg-green-800 text-white rounded-full shadow-md transition-all duration-200 flex items-center justify-center"
                onClick={() => document.getElementById('excel-upload')?.click()}
                disabled={isLoading}
            >
                <Upload className="w-5 h-5" />
                {isLoading ? 'Đang xử lý...' : 'Nhập Excel'}
            </Button>
        </div>
    );
} 