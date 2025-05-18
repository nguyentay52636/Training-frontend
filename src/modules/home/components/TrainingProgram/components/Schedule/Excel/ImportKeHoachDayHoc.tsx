import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpToLine } from 'lucide-react';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

interface ImportKeHoachDayHocProps {
    onImport: (data: any[]) => void;
}

export default function ImportKeHoachDayHoc({ onImport }: ImportKeHoachDayHocProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                // Transform data to match the expected format
                const transformedData = jsonData.map((item: any) => ({
                    maHP: item['Mã học phần'],
                    tenHP: item['Tên học phần'],
                    soTinChi: item['Số tín chỉ'],
                    soTietLyThuyet: item['Số tiết lý thuyết'],
                    soTietThucHanh: item['Số tiết thực hành'],
                    soTietThucTap: item['Số tiết thực tập'],
                    tongSoTiet: item['Tổng số tiết'],
                    loaiHocPhan: item['Loại học phần'] === 'Bắt buộc' ? 0 : 1,
                    heSoHocPhan: item['Hệ số học phần'],
                }));

                onImport(transformedData);
                toast.success('Nhập Excel thành công!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } catch (error) {
                console.error('Error importing Excel:', error);
                toast.error('Có lỗi xảy ra khi nhập Excel!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        };

        reader.readAsBinaryString(file);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImport}
                accept=".xlsx,.xls"
                className="hidden"
            />
            <Button
                onClick={handleClick}
                className='rounded-xl bg-green-700 cursor-pointer hover:bg-green-800'
            >
                <ArrowUpToLine className="mr-2 h-4 w-4" /> Nhập Excel
            </Button>
        </>
    );
}
