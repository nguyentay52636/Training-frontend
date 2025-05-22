import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { KeHoachMoNhomType } from '@/lib/apis/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TablePlanGroupProps {
  data: KeHoachMoNhomType[];
  loading: boolean;
  onEdit: (data: KeHoachMoNhomType) => void;
  onDelete: (data: KeHoachMoNhomType) => void;
}

export default function TablePlanGroup({ data, loading, onEdit, onDelete }: TablePlanGroupProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-indigo-600 text-white">Năm học</TableHead>
            <TableHead className="bg-indigo-600 text-white">Học kỳ</TableHead>
            <TableHead className="bg-indigo-600 text-white">Số nhóm</TableHead>
            <TableHead className="bg-indigo-600 text-white">Số lượng sinh viên</TableHead>
            <TableHead className="bg-indigo-600 text-white">Học phần</TableHead>
            <TableHead className="bg-indigo-600 text-white">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Đang tải dữ liệu...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                <TableCell>{row.namHoc}</TableCell>
                <TableCell>{row.hocKy}</TableCell>
                <TableCell>{row.soNhom}</TableCell>
                <TableCell>{row.soLuongSinhVien}</TableCell>
                <TableCell>
                  {row.hocPhan
                    ? `${row.hocPhan.maHP} - ${row.hocPhan.tenHP}`
                    : ''}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onEdit(row)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => onDelete(row)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
