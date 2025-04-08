import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { TaiKhoan } from "./DialogAddAccount";
import DialogAddAccount from "./DialogAddAccount";
import { useState, useEffect } from "react";

interface FilterAndActionsAccountProps {
    table: Table<TaiKhoan>;
    onAddTaiKhoan: (newTaiKhoan: TaiKhoan) => void;
}

export default function FilterAndActionsAccount({ table, onAddTaiKhoan }: FilterAndActionsAccountProps) {
    const [filterValue, setFilterValue] = useState<string>("");

    useEffect(() => {
        const currentFilter = table.getColumn("hoTen")?.getFilterValue() as string;
        setFilterValue(currentFilter ?? "");
    }, [table]);

    return (
        <div className="flex items-center justify-between  py-5 bg-white rounded-xl shadow-sm px-6 mb-6">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
                <Input
                    placeholder="Tìm kiếm tài khoản theo họ tên..."
                    value={filterValue}
                    onChange={(event) => {
                        const value = event.target.value;
                        setFilterValue(value);
                        table.getColumn("hoTen")?.setFilterValue(value);
                    }}
                    className="pl-10 rounded-full border-gray-200 text-xl h-12 focus:ring-blue-400 shadow-sm font-bold"
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
                <DialogAddAccount onAddTaiKhoan={onAddTaiKhoan} />
            </div>
        </div>
    );
}