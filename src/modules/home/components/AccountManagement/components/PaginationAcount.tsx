import { Button } from "@/components/ui/button";
import { useReactTable, Table } from "@tanstack/react-table";

// Định nghĩa type GiangVien (giả sử từ file Colums)
interface GiangVien {
    maGiangVien: string;
    hoTenGV: string;
    emailGV: string;
    sdt: string;
}

interface PaginationAcountProps {
    table: Table<GiangVien>;
}

export default function PaginationAcount({ table }: PaginationAcountProps) {
    const pageIndex = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;
    const totalRows = table.getFilteredRowModel().rows.length;
    const startRow = pageIndex * pageSize + 1;
    const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);


    if (totalRows <= 10) {
        return null;
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 px-4 bg-gray-50 rounded-lg shadow-sm">
            {/* Thông tin tổng quan */}
            <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                Đã chọn {table.getFilteredSelectedRowModel().rows.length} trên{" "}
                {totalRows} giảng viên.
            </div>

            {/* Phân trang */}
            <div className="flex items-center flex-wrap gap-4">

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    <span className="sr-only">Trang trước</span>
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Trang trước
                </Button>

                {/* Thông tin trang */}
                <span className="text-sm font-medium text-gray-700">
                    {startRow}-{endRow} của {totalRows}
                </span>

                {/* Nút Tiếp theo */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    Trang sau
                    <span className="sr-only">Trang sau</span>
                    <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Button>

                {/* Chọn số hàng trên mỗi trang (tùy chọn) */}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                    className="border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {[10, 20, 30, 40, 50].map((size) => (
                        <option key={size} value={size}>
                            {size} hàng/trang
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}