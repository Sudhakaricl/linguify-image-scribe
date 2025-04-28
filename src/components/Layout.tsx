
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
                <SidebarMenuButton 
                  asChild 
                  tooltip="Home" 
                  className="hover:bg-indigo-50 group"
                >
                  <a 
                    href="/" 
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/');
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      location.pathname === '/' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'
                    }`}
                  >
                    <Home className="h-5 w-5 group-hover:text-indigo-600" />
                    <span className="group-hover:text-indigo-600">Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="History" 
                  className="hover:bg-indigo-50 group"
                >
                  <a 
                    href="/history" 
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/history');
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      location.pathname === '/history' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'
                    }`}
                  >
                    <History className="h-5 w-5 group-hover:text-indigo-600" />
                    <span className="group-hover:text-indigo-600">History</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Profile" 
                  className="hover:bg-indigo-50 group"
                >
                  <a 
                    href="/profile" 
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/profile');
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                      location.pathname === '/profile' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'
                    }`}
                  >
                    <User className="h-5 w-5 group-hover:text-indigo-600" />
                    <span className="group-hover:text-indigo-600">Profile</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={signOut} 
                  tooltip="Logout" 
                  className="hover:bg-red-50 group w-full"
                >
                  <div className="flex items-center gap-2 px-4 py-2 rounded-md text-red-600 transition-colors group-hover:text-red-700">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </div>
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
