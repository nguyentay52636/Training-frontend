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
import { PointType } from "@/lib/apis/types";

interface PointActionProps {
    point: PointType;
    onEdit: (point: PointType) => void;
    onViewDetail: (point: PointType) => void;
    onDelete: (point: PointType) => void;
}

export default function PointAction({ point, onEdit, onViewDetail, onDelete }: PointActionProps) {
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
                <DropdownMenuItem>
                    Sao chép mã tài khoản
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onViewDetail(point)}>
                    Xem chi tiết
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(point)}>
                    Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(point)}
                    className="text-red-600 hover:bg-red-50">
                    Xóa
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
