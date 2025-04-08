"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export type GiangVien = {
    maGiangVien: string;
    hoTenGV: string;
    emailGV: string;
    sdt: string;
};

// Dữ liệu mẫu
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
];

// Định nghĩa cột cho bảng
export const columns: ColumnDef<GiangVien>[] = [
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

export function AccountManagement() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [giangVienData, setGiangVienData] = React.useState<GiangVien[]>(data);
    const [newGiangVien, setNewGiangVien] = React.useState<GiangVien>({
        maGiangVien: "",
        hoTenGV: "",
        emailGV: "",
        sdt: "",
    });

    const table = useReactTable({
        data: giangVienData,
        columns,
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

    const handleAddGiangVien = () => {
        if (
            newGiangVien.maGiangVien &&
            newGiangVien.hoTenGV &&
            newGiangVien.emailGV &&
            newGiangVien.sdt
        ) {
            setGiangVienData([...giangVienData, newGiangVien]);
            setNewGiangVien({ maGiangVien: "", hoTenGV: "", emailGV: "", sdt: "" });
        } else {
            alert("Vui lòng điền đầy đủ thông tin!");
        }
    };

    return (
        <div className="w-full p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
            {/* Tiêu đề */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-blue-900 tracking-tight">
                        Quản Lý Giảng Viên
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Quản lý thông tin giảng viên của SGU một cách hiệu quả và chuyên nghiệp
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between py-6 bg-white rounded-xl shadow-sm px-6 mb-6">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                        placeholder="Tìm kiếm giảng viên theo họ tên..."
                        value={(table.getColumn("hoTenGV")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("hoTenGV")?.setFilterValue(event.target.value)
                        }
                        className="pl-10 rounded-full border-gray-200 focus:ring-blue-400 shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-100"
                            >
                                Cột hiển thị <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-md">
                                <Plus className="mr-2 h-5 w-5" /> Thêm Giảng Viên
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] rounded-lg">
                            <DialogHeader>
                                <DialogTitle className="text-blue-900 text-xl">Thêm Giảng Viên Mới</DialogTitle>
                                <DialogDescription className="text-gray-600">
                                    Vui lòng nhập đầy đủ thông tin giảng viên để thêm vào hệ thống.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-5 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="maGiangVien" className="text-right font-medium text-gray-700">
                                        Mã Giảng Viên
                                    </Label>
                                    <Input
                                        id="maGiangVien"
                                        value={newGiangVien.maGiangVien}
                                        onChange={(e) =>
                                            setNewGiangVien({ ...newGiangVien, maGiangVien: e.target.value })
                                        }
                                        className="col-span-3 rounded-lg border-gray-200 focus:ring-blue-400"
                                        placeholder="VD: GV004"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="hoTenGV" className="text-right font-medium text-gray-700">
                                        Họ Tên
                                    </Label>
                                    <Input
                                        id="hoTenGV"
                                        value={newGiangVien.hoTenGV}
                                        onChange={(e) =>
                                            setNewGiangVien({ ...newGiangVien, hoTenGV: e.target.value })
                                        }
                                        className="col-span-3 rounded-lg border-gray-200 focus:ring-blue-400"
                                        placeholder="VD: Nguyễn Văn D"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="emailGV" className="text-right font-medium text-gray-700">
                                        Email
                                    </Label>
                                    <Input
                                        id="emailGV"
                                        value={newGiangVien.emailGV}
                                        onChange={(e) =>
                                            setNewGiangVien({ ...newGiangVien, emailGV: e.target.value })
                                        }
                                        className="col-span-3 rounded-lg border-gray-200 focus:ring-blue-400"
                                        placeholder="VD: email@sgu.edu.vn"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="sdt" className="text-right font-medium text-gray-700">
                                        Số Điện Thoại
                                    </Label>
                                    <Input
                                        id="sdt"
                                        value={newGiangVien.sdt}
                                        onChange={(e) =>
                                            setNewGiangVien({ ...newGiangVien, sdt: e.target.value })
                                        }
                                        className="col-span-3 rounded-lg border-gray-200 focus:ring-blue-400"
                                        placeholder="VD: 0931234567"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={handleAddGiangVien}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 rounded-lg"
                                >
                                    Thêm Giảng Viên
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Bảng danh sách giảng viên */}
            <div className="rounded-xl border border-gray-200 shadow-sm bg-white">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-blue-900 font-semibold py-4">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                                    Không tìm thấy giảng viên nào.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Phân trang */}
            <div className="flex items-center justify-between py-6">
                <div className="text-sm text-gray-600">
                    Đã chọn {table.getFilteredSelectedRowModel().rows.length} trên{" "}
                    {table.getFilteredRowModel().rows.length} giảng viên.
                </div>
                <div className="space-x-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-100"
                    >
                        Trang trước
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-100"
                    >
                        Trang sau
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AccountManagement;