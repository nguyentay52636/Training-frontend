import { PropsWithChildren, useEffect } from 'react';
import SidebarNavigate from '../components/SidebarNavigate';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';

export default function AdminPages({ children }: PropsWithChildren) {
  useEffect(() => {
    console.log('admin page');
  });

  return (
    <div>
      <Header />
      <div className=' flex'>
        <SidebarNavigate children={children} />
        {children || <Outlet />}
      </div>
    </div>
  );
}
