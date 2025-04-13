import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    Updater,
    OnChangeFn,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Colums, TaiKhoan } from "../components/Colums";

interface TableAccountProps {
    data: TaiKhoan[];
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    columnVisibility: VisibilityState;
    rowSelection: any;
    onSortingChange: OnChangeFn<SortingState>;
    onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
    onColumnVisibilityChange: OnChangeFn<VisibilityState>;
    onRowSelectionChange: OnChangeFn<any>;
}

export default function TableAccount({
    data,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    onSortingChange,
    onColumnFiltersChange,
    onColumnVisibilityChange,
    onRowSelectionChange,
}: TableAccountProps) {
    const table = useReactTable({
        data,
        columns: Colums,
        onSortingChange,
        onColumnFiltersChange,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange,
        onRowSelectionChange,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="rounded-md border border-gray-200 shadow-sm bg-white">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="bg-indigo-600 text-white!">
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="text-white! font-semibold py-4">
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
                            <TableCell colSpan={Colums.length} className="h-24 text-center text-gray-500">
                                Không tìm thấy tài khoản nào.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}