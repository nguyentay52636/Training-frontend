// src/components/tables/columns.ts
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Định nghĩa type GiangVien ngay trong file
export type GiangVien = {
    maGiangVien: string;
    hoTenGV: string;
    emailGV: string;
    sdt: string;
};

export const Colums: ColumnDef<GiangVien>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="border-blue-300"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="border-blue-300"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "maGiangVien",
        header: "Mã Giảng Viên",
        cell: ({ row }) => <div className="font-medium">{row.getValue("maGiangVien")}</div>,
    },
    {
        accessorKey: "hoTenGV",
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
        cell: ({ row }) => <div>{row.getValue("hoTenGV")}</div>,
    },
    {
        accessorKey: "emailGV",
        header: "Email",
        cell: ({ row }) => <div className="lowercase text-gray-600">{row.getValue("emailGV")}</div>,
    },
    {
        accessorKey: "sdt",
        header: "Số Điện Thoại",
        cell: ({ row }) => <div>{row.getValue("sdt")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const giangVien = row.original;

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
                            onClick={() => navigator.clipboard.writeText(giangVien.maGiangVien)}
                        >
                            Sao chép mã giảng viên
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