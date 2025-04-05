import { PropsWithChildren } from 'react';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';


export default function MainLayout({ children }: PropsWithChildren) {


  return (
    <div>
      <Header />
      {children || <Outlet />}
    </div>
  );
}
