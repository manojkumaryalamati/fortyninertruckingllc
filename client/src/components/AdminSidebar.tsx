import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  LayoutDashboard, 
  Truck, 
  Package, 
  Users, 
  Settings, 
  FileText,
  BarChart3,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";

export function AdminSidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const NavContent = () => (
    <>
      <div className="p-6 border-b border-border">
        <Link href="/admin">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">49</div>
            <span>Admin</span>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <Link href="/admin">
          <Button variant={location === "/admin" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1">
            <LayoutDashboard size={18} /> Overview
          </Button>
        </Link>
        <Link href="/admin/trips">
          <Button variant={location === "/admin/trips" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1">
            <Package size={18} /> Trips & Loads
          </Button>
        </Link>
        <Link href="/admin/trucks">
          <Button variant={location === "/admin/trucks" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1">
            <Truck size={18} /> Fleet Management
          </Button>
        </Link>
        <Link href="/admin/drivers">
          <Button variant={location === "/admin/drivers" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1">
            <Users size={18} /> Drivers
          </Button>
        </Link>
        <Link href="/admin/documents">
          <Button variant={location === "/admin/documents" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1">
            <FileText size={18} /> Documents
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start gap-3 mb-1">
          <BarChart3 size={18} /> Analytics
        </Button>
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start gap-3 mb-2">
          <Settings size={18} /> Settings
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 mb-4"
          onClick={logout}
        >
          <LogOut size={18} /> Logout
        </Button>
        
        <div className="flex items-center gap-3 px-2 pt-2 border-t border-border">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm overflow-hidden">
            <span className="font-semibold truncate">{user?.name || "Admin User"}</span>
            <span className="text-muted-foreground text-xs truncate" title={user?.email}>{user?.email || "admin@49trucking.com"}</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col sticky top-0 h-screen">
      <NavContent />
    </aside>
  );
}

export function AdminMobileHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background sticky top-0 z-50">
      <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">49</div>
        <span>Admin</span>
      </div>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">49</div>
                <span>Admin Portal</span>
              </div>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              <Link href="/admin">
                <Button variant={location === "/admin" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1" onClick={() => setOpen(false)}>
                  <LayoutDashboard size={18} /> Overview
                </Button>
              </Link>
              <Link href="/admin/trips">
                <Button variant={location === "/admin/trips" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1" onClick={() => setOpen(false)}>
                  <Package size={18} /> Trips & Loads
                </Button>
              </Link>
              <Link href="/admin/trucks">
                <Button variant={location === "/admin/trucks" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1" onClick={() => setOpen(false)}>
                  <Truck size={18} /> Fleet Management
                </Button>
              </Link>
              <Link href="/admin/drivers">
                <Button variant={location === "/admin/drivers" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1" onClick={() => setOpen(false)}>
                  <Users size={18} /> Drivers
                </Button>
              </Link>
              <Link href="/admin/documents">
                <Button variant={location === "/admin/documents" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1" onClick={() => setOpen(false)}>
                  <FileText size={18} /> Documents
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start gap-3 mb-1">
                <BarChart3 size={18} /> Analytics
              </Button>
            </nav>

            <div className="p-4 border-t border-border">
              <Button variant="ghost" className="w-full justify-start gap-3 mb-2">
                <Settings size={18} /> Settings
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 mb-4"
                onClick={logout}
              >
                <LogOut size={18} /> Logout
              </Button>
              
              <div className="flex items-center gap-3 px-2 pt-2 border-t border-border">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm overflow-hidden">
                  <span className="font-semibold truncate">{user?.name || "Admin User"}</span>
                  <span className="text-muted-foreground text-xs truncate" title={user?.email}>{user?.email || "admin@49trucking.com"}</span>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
