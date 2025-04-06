import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import SiderBarNavigate from '@/components/SiderBar/SiderBarNavigate';

export default function AdminPages({ children }: PropsWithChildren) {
  return (
    <div className='relative'>
      <SiderBarNavigate children={children} />
      {children || <Outlet />}
    </div>
  );
}
