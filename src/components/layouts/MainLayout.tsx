
import SidebarNavigate from '@/modules/Admin/components/SidebarNavigate';
import { PropsWithChildren } from 'react';


export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
    <SidebarNavigate children={children}/>
    </div>
  );
}
