import { PropsWithChildren, useEffect } from 'react';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';

export default function MainLayout({ children }: PropsWithChildren) {
  useEffect(() => {
    console.log('mainlayout');
  });

  return (
    <div>
      <Header />

      <h1>mainlaytout</h1>

      {children || <Outlet />}
    </div>
  );
}
