import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
import { LectureType } from '@/lib/apis/types';
import { toast } from 'react-toastify';
import { addLectureExcelAPI, getLectureAPI } from '@/lib/apis/lectureApi';

interface ExcelActionsProps {
    lectureData: LectureType[];
    onImport: (data: LectureType[]) => void;
    onRefresh: () => void;
}

interface ExcelRow {
    'Mã Giảng Viên': string;
    'Tên Giảng Viên': string;
    'Chức Danh': string;
    'Năm Phong': string;
    'Trình Độ': string;
    'Nước': string;
    'Năm Tốt Nghiệp': string;
}

export default function ExcelActions({ lectureData, onImport, onRefresh }: ExcelActionsProps) {
    const handleExport = () => {
        // Prepare data for export
        const exportData = lectureData.map((lecturer) => ({
            'Mã Giảng Viên': lecturer.maGiangVien,
            'Tên Giảng Viên': lecturer.tenGiangVien,
            'Chức Danh': lecturer.chucDanh,
            'Năm Phong': lecturer.namPhong,
            'Trình Độ': lecturer.trinhDo,
            'Nước': lecturer.nuoc,
            'Năm Tốt Nghiệp': lecturer.namTotNghiep,
        }));

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Danh sách giảng viên');

        // Save file
        XLSX.writeFile(wb, 'danh_sach_giang_vien.xlsx');
    };

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json<ExcelRow>(worksheet);

                // Validate required fields
                const invalidRows = jsonData.filter(row => 
                    !row['Mã Giảng Viên'] || 
                    !row['Tên Giảng Viên'] || 
                    !row['Chức Danh'] || 
                    !row['Năm Phong'] || 
                    !row['Trình Độ'] || 
                    !row['Nước'] || 
                    !row['Năm Tốt Nghiệp']
                );

                if (invalidRows.length > 0) {
                    toast.error('File Excel chứa dữ liệu không hợp lệ. Vui lòng kiểm tra lại các trường bắt buộc.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    return;
                }

                // Transform data to match LectureType
                const transformedData = jsonData.map((row) => ({
                    maGiangVien: row['Mã Giảng Viên'],
                    tenGiangVien: row['Tên Giảng Viên'],
                    chucDanh: row['Chức Danh'],
                    namPhong: row['Năm Phong'],
                    trinhDo: row['Trình Độ'],
                    nuoc: row['Nước'],
                    namTotNghiep: row['Năm Tốt Nghiệp'],
                }));

                // Check for existing data
                const existingData: LectureType[] = [];
                const newData: LectureType[] = [];

                transformedData.forEach((newLecturer) => {
                    const isExisting = lectureData.some(
                        (existing) => existing.maGiangVien === newLecturer.maGiangVien
                    );
                    if (isExisting) {
                        existingData.push(newLecturer);
                    } else {
                        newData.push(newLecturer);
                    }
                });

                if (existingData.length > 0) {
                    toast.warning(
                        `Có ${existingData.length} giảng viên đã tồn tại trong hệ thống và sẽ không được thêm vào.`,
                        {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        }
                    );
                }

                if (newData.length > 0) {
                    try {
                        // Add new lecturers to database
                        const addPromises = newData.map(lecturer => addLectureExcelAPI(lecturer));
                        await Promise.all(addPromises);

                        // Fetch updated data from server
                        const updatedData = await getLectureAPI();
                        
                        // Update local state with new data
                        onImport(updatedData);
                        onRefresh();

                        toast.success(
                            `Đã thêm thành công ${newData.length} giảng viên mới vào hệ thống.`,
                            {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            }
                        );
                    } catch (error) {
                        console.error('Error adding lecturers:', error);
                        toast.error('Có lỗi xảy ra khi thêm giảng viên vào hệ thống', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    }
                }

                // Reset file input
                event.target.value = '';
            } catch (error) {
                console.error('Error importing Excel file:', error);
                toast.error('Có lỗi xảy ra khi đọc file Excel', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
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