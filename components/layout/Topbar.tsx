'use client';

import { usePathname } from 'next/navigation';
import { 
  Bell, 
  Search, 
  User,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Topbar() {
  const pathname = usePathname();
  
  // Simple breadcrumb logic
  const getBreadcrumb = () => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 0) return 'Dashboard';
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' / ');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="flex items-center gap-4">
        <button className="rounded-md p-1 hover:bg-muted md:hidden">
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-muted-foreground">Sistema</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">{getBreadcrumb()}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar globalmente..." 
            className="h-9 w-64 rounded-full border bg-muted/50 pl-10 pr-4 text-sm outline-none ring-primary/20 transition-all focus:ring-2"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <button className="relative rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary border-2 border-card" />
          </button>
        </div>
        
        <div className="h-8 w-[1px] bg-border mx-1" />
        
        <button className="flex items-center gap-3 rounded-full py-1 pl-1 pr-3 hover:bg-muted transition-colors">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
            <User className="h-5 w-5" />
          </div>
          <div className="hidden text-left md:block text-xs">
            <p className="font-bold text-foreground">Admin Flux</p>
            <p className="text-muted-foreground">Administrador</p>
          </div>
        </button>
      </div>
    </header>
  );
}
