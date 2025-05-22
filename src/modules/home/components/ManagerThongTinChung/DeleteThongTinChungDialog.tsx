import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useDeleteThongTinChung } from './mutations';
import { toast } from 'sonner';

export default function DeleteThongTinChungDialog({
  idThongTInChung,
}: {
  idThongTInChung: number;
}) {
  const { mutate, isPending } = useDeleteThongTinChung();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size='sm'>
          <Trash className='w-4 h-4' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể hoàn tác. Dữ liệu sẽ bị xóa vĩnh viễn.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutate(idThongTInChung, {
              onSuccess: () => {
                toast.success('Xóa thông tin chung thành công');
              },
              onError: () => {
                toast.error('Có lỗi xảy ra khi xóa thông tin chung');
              }
            })}
            disabled={isPending}
          >
            {isPending ? 'Đang xử lý...' : 'Xóa'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
