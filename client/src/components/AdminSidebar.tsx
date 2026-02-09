import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  LayoutDashboard, 
  Truck, 
  Package, 
  Users, 
  Settings, 
  FileText,
  Briefcase,
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

  const isActive = (path: string) => location === path;

  const NavContent = () => (
    <>
      <div className="p-6 mb-2">
        <Link href="/admin">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">49</div>
            <span className="text-xl font-black tracking-tight text-zinc-900">Trucking<span className="text-blue-600">.</span></span>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 px-3 space-y-1">
        <p className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 mt-2">Menu</p>
        
        <Link href="/admin">
          <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium transition-all duration-200 ${isActive("/admin") ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}>
            <LayoutDashboard size={18} /> Overview
          </Button>
        </Link>
        <Link href="/admin/trucks">
          <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium transition-all duration-200 ${isActive("/admin/trucks") ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}>
            <Truck size={18} /> Trucks
          </Button>
        </Link>
        <Link href="/admin/trips">
          <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium transition-all duration-200 ${isActive("/admin/trips") ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}>
            <Package size={18} /> Trips & Loads
          </Button>
        </Link>
        <Link href="/admin/drivers">
          <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium transition-all duration-200 ${isActive("/admin/drivers") ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}>
            <Users size={18} /> Drivers
          </Button>
        </Link>
        <Link href="/admin/documents">
          <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium transition-all duration-200 ${isActive("/admin/documents") ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}>
            <FileText size={18} /> Documents
          </Button>
        </Link>
        <Link href="/admin/applications">
          <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium transition-all duration-200 ${isActive("/admin/applications") ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`}>
            <Briefcase size={18} /> Applications
          </Button>
        </Link>
      </nav>

      <div className="p-4 border-t border-zinc-100 bg-white">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-zinc-500 hover:text-red-600 hover:bg-red-50 mb-4 font-medium transition-colors"
          onClick={logout}
        >
          <LogOut size={18} /> Logout
        </Button>
        
        <div className="flex items-center gap-3 px-2 pt-2 border-t border-zinc-100">
          <Avatar className="h-9 w-9 border border-zinc-200 shadow-sm">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-zinc-100 text-zinc-500">AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm overflow-hidden">
            <span className="font-bold text-zinc-900 truncate">{user?.displayName || "Admin User"}</span>
            <span className="text-zinc-500 text-xs truncate" title={user?.email || ""}>{user?.email || "admin@49trucking.com"}</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <aside className="w-72 bg-white border-r border-zinc-200 hidden md:flex flex-col sticky top-0 h-screen shadow-sm z-30">
      <NavContent />
    </aside>
  );
}

export function AdminMobileHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const isActive = (path: string) => location === path;

  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
         <div className="h-8 w-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold">49</div>
        <span className="text-lg font-black text-zinc-900 tracking-tight">Trucking.</span>
      </div>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-zinc-900">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 bg-white border-r border-zinc-200">
          <div className="flex flex-col h-full">
            <div className="p-6 mb-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">49</div>
                <span className="text-xl font-black tracking-tight text-zinc-900">Trucking<span className="text-blue-600">.</span></span>
              </div>
            </div>
            
            <nav className="flex-1 px-3 space-y-1">
              <p className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 mt-2">Menu</p>
              <Link href="/admin">
                <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium ${isActive("/admin") ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`} onClick={() => setOpen(false)}>
                  <LayoutDashboard size={18} /> Overview
                </Button>
              </Link>
              <Link href="/admin/trucks">
                <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium ${isActive("/admin/trucks") ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`} onClick={() => setOpen(false)}>
                  <Truck size={18} /> Trucks
                </Button>
              </Link>
              <Link href="/admin/trips">
                <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium ${isActive("/admin/trips") ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`} onClick={() => setOpen(false)}>
                  <Package size={18} /> Trips & Loads
                </Button>
              </Link>
              <Link href="/admin/drivers">
                <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium ${isActive("/admin/drivers") ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`} onClick={() => setOpen(false)}>
                  <Users size={18} /> Drivers
                </Button>
              </Link>
              <Link href="/admin/documents">
                <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium ${isActive("/admin/documents") ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`} onClick={() => setOpen(false)}>
                  <FileText size={18} /> Documents
                </Button>
              </Link>
              <Link href="/admin/applications">
                <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium ${isActive("/admin/applications") ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"}`} onClick={() => setOpen(false)}>
                  <Briefcase size={18} /> Applications
                </Button>
              </Link>
            </nav>

            <div className="p-4 border-t border-zinc-100 bg-white">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 text-zinc-500 hover:text-red-600 hover:bg-red-50 mb-4 font-medium"
                onClick={logout}
              >
                <LogOut size={18} /> Logout
              </Button>
              
              <div className="flex items-center gap-3 px-2 pt-2 border-t border-zinc-100">
                <Avatar className="h-8 w-8 border border-zinc-200">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-zinc-100 text-zinc-500">AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm overflow-hidden">
                  <span className="font-semibold text-zinc-900 truncate">{user?.displayName || "Admin User"}</span>
                  <span className="text-zinc-500 text-xs truncate" title={user?.email || ""}>{user?.email || "admin@49trucking.com"}</span>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
