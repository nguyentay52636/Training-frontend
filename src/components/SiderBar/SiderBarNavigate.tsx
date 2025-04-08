import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';

export default function SiderBarNavigate({ children }: { children?: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Trạng thái sidebar

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white border-r border-gray-200`}>
          <AppSidebar />
        </div>

        {/* Nội dung chính */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto bg-gray-100">
            <div className="flex items-center gap-2 my-12">
              <SidebarTrigger onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            </div>
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}