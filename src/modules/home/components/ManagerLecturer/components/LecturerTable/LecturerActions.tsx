import { Button } from '@/components/ui/button';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { UserType } from '@/lib/apis/types';
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Ellipsis } from 'lucide-react';
import { useRemoveTeacherMutation } from '../mutations';

export default function LecturerActions({ user }: { user: UserType }) {
  const { mutate } = useRemoveTeacherMutation();

  const handleDeleteUser = () => {
    if (!user) return;
    mutate(user.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className=' cursor-pointer' variant='ghost'>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Chỉnh sữa</DropdownMenuItem>
        <DropdownMenuItem>Export</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteUser} variant='destructive'>
          Xoá
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
