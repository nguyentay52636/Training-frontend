import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Outlet } from 'react-router-dom';

export default function SiderBarNavigate({ children }: { children?: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SidebarProvider>

      {/* Sidebar */}
      <AppSidebar />
      {/* Nội dung chính */}
      <div className="flex-1 flex flex-col min-w-0">
        <SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto bg-gray-100">
          {children || <Outlet />}
        </main>
      </div>

    </SidebarProvider>
  );
}