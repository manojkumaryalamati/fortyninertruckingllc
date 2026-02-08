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
      <div className="p-6 border-b border-zinc-100">
        <Link href="/admin">
          <div className="flex items-center gap-2 cursor-pointer">
            <span className="text-xl font-black tracking-tight text-zinc-900">FortyNiner<span className="text-primary">Admin</span></span>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 bg-white">
        <Link href="/admin">
          <Button variant={location === "/admin" ? "secondary" : "ghost"} className={`w-full justify-start gap-3 mb-1 font-medium ${location === "/admin" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}>
            <LayoutDashboard size={18} /> Overview
          </Button>
        </Link>
        <Link href="/admin/trucks">
          <Button variant={location === "/admin/trucks" ? "secondary" : "ghost"} className={`w-full justify-start gap-3 mb-1 font-medium ${location === "/admin/trucks" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}>
            <Truck size={18} /> Trucks
          </Button>
        </Link>
        <Link href="/admin/trips">
          <Button variant={location === "/admin/trips" ? "secondary" : "ghost"} className={`w-full justify-start gap-3 mb-1 font-medium ${location === "/admin/trips" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}>
            <Package size={18} /> Trips & Loads
          </Button>
        </Link>
        <Link href="/admin/drivers">
          <Button variant={location === "/admin/drivers" ? "secondary" : "ghost"} className={`w-full justify-start gap-3 mb-1 font-medium ${location === "/admin/drivers" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}>
            <Users size={18} /> Drivers
          </Button>
        </Link>
        <Link href="/admin/documents">
          <Button variant={location === "/admin/documents" ? "secondary" : "ghost"} className={`w-full justify-start gap-3 mb-1 font-medium ${location === "/admin/documents" ? "bg-zinc-100 text-zinc-900" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}>
            <FileText size={18} /> Documents
          </Button>
        </Link>
      </nav>

      <div className="p-4 border-t border-zinc-100 bg-white">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 mb-4 font-medium"
          onClick={logout}
        >
          <LogOut size={18} /> Logout
        </Button>
        
        <div className="flex items-center gap-3 px-2 pt-2 border-t border-zinc-100">
          <Avatar className="h-9 w-9 border border-zinc-200">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm overflow-hidden">
            <span className="font-bold text-zinc-900 truncate">{user?.displayName || "Admin User"}</span>
            <span className="text-zinc-400 text-xs truncate" title={user?.email || ""}>{user?.email || "admin@49trucking.com"}</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <aside className="w-64 border-r border-zinc-200 bg-white hidden md:flex flex-col sticky top-0 h-screen shadow-sm z-30">
      <NavContent />
    </aside>
  );
}

export function AdminMobileHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-200 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-zinc-900">FortyNiner Admin</span>
      </div>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-zinc-900">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 bg-white">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-zinc-900">FortyNiner Admin</span>
              </div>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              <Link href="/admin">
                <Button variant={location === "/admin" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1" onClick={() => setOpen(false)}>
                  <LayoutDashboard size={18} /> Overview
                </Button>
              </Link>
              <Link href="/admin/trucks">
                <Button variant={location === "/admin/trucks" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1" onClick={() => setOpen(false)}>
                  <Truck size={18} /> Trucks
                </Button>
              </Link>
              <Link href="/admin/trips">
                <Button variant={location === "/admin/trips" ? "secondary" : "ghost"} className="w-full justify-start gap-3 mb-1" onClick={() => setOpen(false)}>
                  <Package size={18} /> Trips & Loads
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
            </nav>

            <div className="p-4 border-t border-zinc-100">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 mb-4"
                onClick={logout}
              >
                <LogOut size={18} /> Logout
              </Button>
              
              <div className="flex items-center gap-3 px-2 pt-2 border-t border-zinc-100">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm overflow-hidden">
                  <span className="font-semibold text-zinc-900 truncate">{user?.displayName || "Admin User"}</span>
                  <span className="text-zinc-400 text-xs truncate" title={user?.email || ""}>{user?.email || "admin@49trucking.com"}</span>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
