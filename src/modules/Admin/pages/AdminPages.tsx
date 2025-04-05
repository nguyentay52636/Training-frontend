import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import SiderBarNavigate from '@/components/SiderBar/SiderBarNavigate';


export default function AdminPages({ children }: PropsWithChildren) {


  return (
    <div>
      <Header />
      <div className='flex justify-center'>
        <SiderBarNavigate children={children} />
        {children || <Outlet />}
      </div>
    </div>
  );
}
