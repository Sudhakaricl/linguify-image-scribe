
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Home, History, User, LogOut } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && !location.pathname.includes('/login') && !location.pathname.includes('/signup')) {
      navigate('/login');
    }
  }, [user, navigate, location.pathname]);

  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Home" className="hover:bg-indigo-50">
                  <a href="/" onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                  }}>
                    <Home />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="History" className="hover:bg-indigo-50">
                  <a href="/history" onClick={(e) => {
                    e.preventDefault();
                    navigate('/history');
                  }}>
                    <History />
                    <span>History</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile" className="hover:bg-indigo-50">
                  <a href="/profile" onClick={(e) => {
                    e.preventDefault();
                    navigate('/profile');
                  }}>
                    <User />
                    <span>Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={signOut} tooltip="Logout" className="hover:bg-red-50 text-red-600 hover:text-red-700">
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-4 bg-gray-50">{children}</main>
      </div>
    </SidebarProvider>
  );
}
