import React, { useState } from "react";
import {
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    Table,
} from "@tanstack/react-table";
import { Colums } from "../components/Colums";
import TableAccount from "../components/TableAccount";
import FilterAndActionsAccount from "../components/FilterAndActionsAccount";
import PaginationAcount from "../components/PaginationAcount";
import DialogAddAccount from "../components/DialogAddAccount";


type GiangVien = {
    maGiangVien: string;
    hoTenGV: string;
    emailGV: string;
    sdt: string;
};
const data: GiangVien[] = [
    {
        maGiangVien: "GV001",
        hoTenGV: "Nguyễn Văn A",
        emailGV: "nguyenvana@sgu.edu.vn",
        sdt: "0901234567",
    },
    {
        maGiangVien: "GV002",
        hoTenGV: "Trần Thị B",
        emailGV: "tranthib@sgu.edu.vn",
        sdt: "0912345678",
    },
    {
        maGiangVien: "GV003",
        hoTenGV: "Lê Văn C",
        emailGV: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maGiangVien: "GV003",
        hoTenGV: "Lê Văn C",
        emailGV: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maGiangVien: "GV003",
        hoTenGV: "Lê Văn C",
        emailGV: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maGiangVien: "GV003",
        hoTenGV: "Lê Văn C",
        emailGV: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maGiangVien: "GV003",
        hoTenGV: "Lê Văn C",
        emailGV: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maGiangVien: "GV003",
        hoTenGV: "Lê Văn C",
        emailGV: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maGiangVien: "GV003",
        hoTenGV: "Lê Văn C",
        emailGV: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maGiangVien: "GV003",
        hoTenGV: "Lê Văn C",
        emailGV: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maGiangVien: "GV003",
        hoTenGV: "Lê Văn C",
        emailGV: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maGiangVien: "GV003",
        hoTenGV: "Lê Văn C",
        emailGV: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maGiangVien: "GV003",
        hoTenGV: "Lê Văn C",
        emailGV: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maGiangVien: "GV003",
        hoTenGV: "Lê Văn C",
        emailGV: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
];

interface FilterAndActionsAccountProps {
    table: Table<GiangVien>;
}

export default function AccountManagement() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [giangVienData, setGiangVienData] = useState<GiangVien[]>(data);

    const handleAddGiangVien = (newGiangVien: GiangVien) => {
        setGiangVienData([...giangVienData, newGiangVien]);
    };

    const table = useReactTable<GiangVien>({
        data: giangVienData,
        columns: Colums,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
            {/* Tiêu đề */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-blue-900 tracking-tight">
                        Quản Lý tài khoản
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Quản lý thông tin giảng viên của SGU một cách hiệu quả và chuyên nghiệp
                    </p>
                </div>
            </div>

            <FilterAndActionsAccount table={table} onAddGiangVien={handleAddGiangVien} />


            <TableAccount
                data={giangVienData}
                sorting={sorting}
                columnFilters={columnFilters}
                columnVisibility={columnVisibility}
                rowSelection={rowSelection}
                onSortingChange={setSorting}
                onColumnFiltersChange={setColumnFilters}
                onColumnVisibilityChange={setColumnVisibility}
                onRowSelectionChange={setRowSelection}
            />

            <PaginationAcount table={table} />

        </div>
    );
}