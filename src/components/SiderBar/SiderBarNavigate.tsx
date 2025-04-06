import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Header } from '../Header';

export default function SiderBarNavigate({ children }: { children: React.ReactNode }) {
  return (

    <SidebarProvider>
      <div className="relative">
        <Header />
        <AppSidebar />


      </div>
      <main>
        <div className="relative cursor-pointer">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>

  );
}
