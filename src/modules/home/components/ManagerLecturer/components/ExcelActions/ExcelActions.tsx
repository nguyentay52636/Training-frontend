import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
import { UserType } from '@/lib/apis/types';

interface ExcelActionsProps {
    lectureData: UserType[];
    onImport: (data: UserType[]) => void;
}

export default function ExcelActions({ lectureData, onImport }: ExcelActionsProps) {
    const handleExport = () => {
        // Prepare data for export
        const exportData = lectureData.map((user) => ({
            ID: user.id,
            'Tên người dùng': user.userName,
            Email: user.userEmail,
            'Vai trò': user.role,
            'Quyền': user.admin ? 'Admin' : 'Người dùng',
        }));

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Danh sách giảng viên');

        // Save file
        XLSX.writeFile(wb, 'danh_sach_giang_vien.xlsx');
    };

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

                // Transform data to match UserType
                const transformedData = jsonData.map((row: any) => ({
                    id: row.ID,
                    userName: row['Tên người dùng'],
                    userEmail: row.Email,
                    role: row['Vai trò'],
                    admin: row['Quyền'] === 'Admin',
                }));

                onImport(transformedData);
            } catch (error) {
                console.error('Error importing Excel file:', error);
                alert('Có lỗi xảy ra khi đọc file Excel');
            }
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div className="flex gap-2 mb-4">
            <Button
                onClick={handleExport}
                className="rounded-full bg-green-700 hover:bg-green-700 text-white shadow-md border-none flex items-center h-10 px-6 text-base font-medium gap-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                style={{ minWidth: 150 }}
            >
                <Download className="h-5 w-5 mr-2" />
                Xuất Excel
            </Button>
            <div className="relative">
                <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleImport}
                    className="hidden"
                    id="excel-import"
                />
                <Button
                    onClick={() => document.getElementById('excel-import')?.click()}
                    className="rounded-full bg-green-700 hover:bg-green-700 text-white shadow-md border-none flex items-center h-10 px-6 text-base font-medium gap-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                    style={{ minWidth: 150 }}
                >
                    <Upload className="h-5 w-5 mr-2" />
                    Nhập Excel
                </Button>
            </div>
        </div>
    );
} 