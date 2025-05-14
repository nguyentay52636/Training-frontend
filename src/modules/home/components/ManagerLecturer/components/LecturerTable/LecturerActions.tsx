import { Button } from '@/components/ui/button';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LectureType } from '@/lib/apis/types';
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { useRemoveTeacherMutation } from '../mutations';
import EditLectureDialog from '../EditLecture';
import { useState } from 'react';

export default function LecturerActions({ user }: { user: LectureType }) {
  const { mutate } = useRemoveTeacherMutation();
  const [open, setOpen] = useState(false);

  const handleDeleteUser = () => {
    if (!user) return;
    if (user.idGiangVien) {
      mutate(user.idGiangVien);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className=' cursor-pointer' variant='ghost'>
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>CHỉnh sữa</DropdownMenuItem>
          <DropdownMenuItem>Export</DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteUser} variant='destructive'>
            Xoá
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditLectureDialog onClose={() => setOpen(false)} open={open} lecture={user} />
    </>
  );
}
