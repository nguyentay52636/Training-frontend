// src/components/tables/columns.ts
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Định nghĩa type TaiKhoan ngay trong file
export type TaiKhoan = {
    maTaiKhoan: string;
    hoTen: string;
    email: string;
    sdt: string;
};

export const Colums: ColumnDef<TaiKhoan>[] = [
    {
        id: "select",
        cell: () => {
            const [isChecked, setIsChecked] = useState(false);
            return (
                <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => setIsChecked(!isChecked)}
                    aria-label="Select row"
                    className="border-blue-500 font-bold"
                />
            );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "maTaiKhoan",
        header: "Mã Tài Khoản",
        cell: ({ row }) => <div className="font-medium">{row.getValue("maTaiKhoan")}</div>,
    },
    {
        accessorKey: "hoTen",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="text-blue-900 hover:text-blue-700"
            >
                Họ Tên
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("hoTen")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div className="lowercase text-gray-600">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "sdt",
        header: "Số Điện Thoại",
        cell: ({ row }) => <div>{row.getValue("sdt")}</div>,
    },
    {
        id: "actions",
        header: "Tác vụ",
        enableHiding: false,
        cell: ({ row }) => {
            const taiKhoan = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-100">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4 text-blue-600" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Thao Tác</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(taiKhoan.maTaiKhoan)}
                        >
                            Sao chép mã tài khoản
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                        <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                            Xóa
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];