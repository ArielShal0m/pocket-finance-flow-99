import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PiggyBank, LayoutGrid, Gauge, Building2, Users, BarChart3, FileText, Settings } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const AppSidebar = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon" className="border-r">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1 transition-all">
            <PiggyBank className="h-6 w-6 text-primary animate-pulse" />
            <span className="font-semibold group-data-[collapsible=icon]:hidden">Finance Flow</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Geral</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isActive('/dashboard') && !location.pathname.includes('/enterprise')}
                    onClick={() => navigate('/dashboard')}
                    className="transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    <LayoutGrid />
                    <span>Início</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isActive('/dashboard/enterprise')}
                    onClick={() => navigate('/dashboard/enterprise?tab=overview')}
                    className="transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    <Gauge />
                    <span>Enterprise</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Gestão</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname.startsWith('/dashboard/enterprise') && location.search.includes('tab=companies')}>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard/enterprise?tab=companies'); }} className="transition-all hover:translate-x-0.5">
                      <Building2 />
                      <span>Empresa</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname.startsWith('/dashboard/enterprise') && location.search.includes('tab=users')}>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard/enterprise?tab=users'); }} className="transition-all hover:translate-x-0.5">
                      <Users />
                      <span>Usuários</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname.startsWith('/dashboard/enterprise') && location.search.includes('tab=reports')}>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard/enterprise?tab=reports'); }} className="transition-all hover:translate-x-0.5">
                      <FileText />
                      <span>Relatórios</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname.startsWith('/dashboard/enterprise') && (location.search.includes('tab=overview') || location.search === '')}>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard/enterprise?tab=overview'); }} className="transition-all hover:translate-x-0.5">
                      <BarChart3 />
                      <span>Insights</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname.startsWith('/dashboard/enterprise') && location.search.includes('tab=settings')}>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard/enterprise?tab=settings'); }} className="transition-all hover:translate-x-0.5">
                      <Settings />
                      <span>Configurações</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarTrigger />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="bg-gradient-to-b from-muted/30 to-transparent h-2 w-full animate-[pulse_2s_ease-in-out_infinite]" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppSidebar;


