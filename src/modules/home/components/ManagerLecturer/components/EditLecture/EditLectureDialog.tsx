import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogDescription } from '@radix-ui/react-dialog';
import EditLecutreFomr from './EditLectureForm';
import { toast } from 'react-toastify';

export default function EditLectureDialog({
  lecture,
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
  lecture: {
    maGiangVien: string;
    tenGiangVien: string;
    chucDanh: string;
    namPhong: string;
    trinhDo: string;
    nuoc: string;
    namTotNghiep: string;
  };
}) {
  const handleCloseDialog = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className='sm:max-w-[500px] rounded-lg'>
        <DialogHeader>
          <DialogTitle className='text-blue-900 text-xl'>Chỉnh sửa</DialogTitle>
          <DialogDescription hidden></DialogDescription>
        </DialogHeader>
        <EditLecutreFomr lecture={lecture} onClose={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  );
}
