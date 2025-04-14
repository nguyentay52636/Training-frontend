
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';

export default function MajorTable({
    major,
}: {
    major: {
        stt: number;
        maHocPhan: string;
        soTC: number;
        lyThuyet: string;
        thucHanh: string;
        tenHocPhan: string;
    };
}) {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>STT</TableHead>
                        <TableHead>Mã học phần</TableHead>
                        <TableHead>Số TC</TableHead>
                        <TableHead>Số tiết</TableHead>
                        <TableHead className='text-center'>Lý thuyết</TableHead>
                        <TableHead className='text-center'>Thực hành</TableHead>
                        <TableHead>Thao tác</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>{major.stt}</TableCell>
                        <TableCell>{major.maHocPhan}</TableCell>
                        <TableCell>{major.soTC}</TableCell>
                        <TableCell>{major.soTC * 15}</TableCell>
                        <TableCell className='text-center'>{major.lyThuyet}</TableCell>
                        <TableCell className='text-center'>{major.thucHanh}</TableCell>
                        <TableCell>
                            <div className='flex gap-2'>
                                <button className='text-blue-600 hover:text-blue-800 cursor-pointer'><Pencil size={20} /></button>
                                <button className='text-red-600 hover:text-red-800 cursor-pointer'><Trash2 size={20} /></button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
}
