import { PropsWithChildren } from 'react';

import { Outlet } from 'react-router-dom';


export default function MainLayout({ children }: PropsWithChildren) {


  return (
    <div>
      {/* {children || <Outlet />} */}
    </div>
  );
}
