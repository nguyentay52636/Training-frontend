
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function TablePlanGroup() {


    return (
        <div className='w-full'>
            <Table>
                <TableHeader>
                    <TableRow className=" bg-indigo-600 text-white!">
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Mã giảng viên</TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Họ và tên giảng viên</TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Chức danh</TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Năm phong</TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Trình đọ </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Năm tốt nghiệp </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Nước </TableHead>
                        <TableHead className="text-lg font-semibold tracking-wide uppercase text-white!">Hành động </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                </TableBody>
            </Table>
        </div>
    );
}
