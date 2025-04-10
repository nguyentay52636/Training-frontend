
import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
export default function PointAction() {
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
}
