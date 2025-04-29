
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, History, User, LogOut, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    if (!user && !location.pathname.includes('/login') && !location.pathname.includes('/signup')) {
      navigate('/login');
    }
  }, [user, navigate, location.pathname]);

  // Adjust sidebar visibility on screen size change
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  if (!user) return null;

  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        {/* Mobile header with menu button */}
        {isMobile && (
          <div className="fixed top-0 left-0 w-full bg-white h-16 flex items-center px-4 shadow-sm z-20">
            <Button 
              variant="ghost" 
              size="icon"
              className="mr-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <span className="font-semibold text-indigo-700">Text Extraction</span>
          </div>
        )}

        {/* Sidebar */}
        <div 
          className={`
            ${isMobile ? 'fixed z-10 h-full' : 'relative'} 
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            transition-transform duration-300 ease-in-out
          `}
        >
          <Sidebar className="h-full bg-white shadow-lg border-r border-gray-200">
            {!isMobile && (
              <div className="p-4 flex items-center justify-center border-b border-gray-100">
                <h1 className="text-xl font-bold text-indigo-700">Text Extraction</h1>
              </div>
            )}
            <SidebarContent className="p-3">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={isMobile ? undefined : "Home"} 
                    className="hover:bg-indigo-50 group w-full"
                  >
                    <Link
                      to="/" 
                      onClick={handleNavigation('/')}
                      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                        location.pathname === '/' 
                          ? 'bg-indigo-100 text-indigo-700' 
                          : 'text-gray-700 hover:text-indigo-700'
                      }`}
                    >
                      <Home className="h-5 w-5 group-hover:text-indigo-600 flex-shrink-0" />
                      <span className="group-hover:text-indigo-600 font-medium">Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={isMobile ? undefined : "History"} 
                    className="hover:bg-indigo-50 group w-full"
                  >
                    <Link
                      to="/history" 
                      onClick={handleNavigation('/history')}
                      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                        location.pathname === '/history' 
                          ? 'bg-indigo-100 text-indigo-700' 
                          : 'text-gray-700 hover:text-indigo-700'
                      }`}
                    >
                      <History className="h-5 w-5 group-hover:text-indigo-600 flex-shrink-0" />
                      <span className="group-hover:text-indigo-600 font-medium">History</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={isMobile ? undefined : "Profile"} 
                    className="hover:bg-indigo-50 group w-full"
                  >
                    <Link
                      to="/profile" 
                      onClick={handleNavigation('/profile')}
                      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                        location.pathname === '/profile' 
                          ? 'bg-indigo-100 text-indigo-700' 
                          : 'text-gray-700 hover:text-indigo-700'
                      }`}
                    >
                      <User className="h-5 w-5 group-hover:text-indigo-600 flex-shrink-0" />
                      <span className="group-hover:text-indigo-600 font-medium">Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={signOut} 
                      tooltip={isMobile ? undefined : "Logout"} 
                      className="hover:bg-red-50 group w-full"
                    >
                      <div className="flex items-center gap-3 px-4 py-3 rounded-md text-red-600 transition-colors group-hover:text-red-700">
                        <LogOut className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium">Logout</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </div>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </div>
        
        {/* Overlay to close sidebar on mobile */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-0"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        
        {/* Main content */}
        <main className={`
          flex-1 overflow-auto transition-all duration-300
          ${isMobile ? 'pt-16' : 'p-0'}
        `}>
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
