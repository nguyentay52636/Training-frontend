import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetThongTInChung } from './qeurys';
import DeleteThongTinChungDialog from './DeleteThongTinChungDialog';
import EditThongTinChungDialog from './EditThongTinChungDialog';

export default function ThongTinChungTable() {
  const { data } = useGetThongTInChung();

  return (
    data && (
      <>
        <Card className='border-gray-200 shadow-sm'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold text-gray-800'>
              Danh sách chương trình đào tạo
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên chương trình</TableHead>
                  <TableHead>Bậc</TableHead>
                  <TableHead>Loại bằng</TableHead>
                  <TableHead>Loại hình đào tạo</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Số tín chỉ</TableHead>
                  <TableHead>Khoa quản lý</TableHead>
                  <TableHead>Ngôn ngữ</TableHead>
                  <TableHead>Khóa tuyển</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.tenChuongTrinh}</TableCell>
                    <TableCell>{item.bac}</TableCell>
                    <TableCell>{item.loaiBang}</TableCell>
                    <TableCell>{item.loaiHinhDaoTao}</TableCell>
                    <TableCell>{item.thoiGian}</TableCell>
                    <TableCell>{item.soTinChi}</TableCell>
                    <TableCell>{item.khoaQuanLy}</TableCell>
                    <TableCell>{item.ngonNgu}</TableCell>
                    <TableCell>{item.khoaTuyen}</TableCell>
                    <TableCell className='space-x-2'>
                      <EditThongTinChungDialog dataThongTinChung={item} />
                      <DeleteThongTinChungDialog idThongTInChung={item.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </>
    )
  );
}
