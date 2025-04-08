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


type TaiKhoan = {
    maTaiKhoan: string;
    hoTen: string;
    email: string;
    sdt: string;
};

const data: TaiKhoan[] = [
    {
        maTaiKhoan: "TK001",
        hoTen: "Nguyễn Văn A",
        email: "nguyenvana@sgu.edu.vn",
        sdt: "0901234567",
    },
    {
        maTaiKhoan: "TK002",
        hoTen: "Trần Thị B",
        email: "tranthib@sgu.edu.vn",
        sdt: "0912345678",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
    {
        maTaiKhoan: "TK003",
        hoTen: "Lê Văn C",
        email: "levanc@sgu.edu.vn",
        sdt: "0923456789",
    },
];

interface FilterAndActionsAccountProps {
    table: Table<TaiKhoan>;
}

export default function AccountManagement() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [taiKhoanData, setTaiKhoanData] = useState<TaiKhoan[]>(data);

    const handleAddTaiKhoan = (newTaiKhoan: TaiKhoan) => {
        setTaiKhoanData([...taiKhoanData, newTaiKhoan]);
    };

    const table = useReactTable<TaiKhoan>({
        data: taiKhoanData,
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
                        Quản lý thông tin tài khoản của SGU một cách hiệu quả và chuyên nghiệp
                    </p>
                </div>
            </div>

            <FilterAndActionsAccount table={table} onAddTaiKhoan={handleAddTaiKhoan} />

            <TableAccount
                data={taiKhoanData}
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