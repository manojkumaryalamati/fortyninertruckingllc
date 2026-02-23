import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/Logo";
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export function AdminSidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const handleLogout = async () => {
    setIsLogoutDialogOpen(false);
    await logout();
  };

  const NavContent = () => (
    <>
      <div className="flex justify-start w-full py-6 px-4">
        <Link href="/admin">
          <div className="flex items-center justify-start w-full cursor-pointer">
            <Logo dark={true} stacked={true} iconSize="h-16" className="items-center text-center w-full" />
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 mt-2">Menu</p>
        
        <Link href="/admin">
          <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium transition-all duration-200 ${isActive("/admin") ? "bg-primary text-white shadow-sm ring-1 ring-primary/50" : "text-zinc-400 hover:text-white hover:bg-white/10"}`}>
            <LayoutDashboard size={18} /> Overview
          </Button>
        </Link>
        <Link href="/admin/trucks">
          <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium transition-all duration-200 ${isActive("/admin/trucks") ? "bg-primary text-white shadow-sm ring-1 ring-primary/50" : "text-zinc-400 hover:text-white hover:bg-white/10"}`}>
            <Truck size={18} /> Trucks
          </Button>
        </Link>
        <Link href="/admin/trips">
          <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium transition-all duration-200 ${isActive("/admin/trips") ? "bg-primary text-white shadow-sm ring-1 ring-primary/50" : "text-zinc-400 hover:text-white hover:bg-white/10"}`}>
            <Package size={18} /> Trips & Loads
          </Button>
        </Link>
        <Link href="/admin/drivers">
          <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium transition-all duration-200 ${isActive("/admin/drivers") ? "bg-primary text-white shadow-sm ring-1 ring-primary/50" : "text-zinc-400 hover:text-white hover:bg-white/10"}`}>
            <Users size={18} /> Drivers
          </Button>
        </Link>
        <Link href="/admin/documents">
          <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium transition-all duration-200 ${isActive("/admin/documents") ? "bg-primary text-white shadow-sm ring-1 ring-primary/50" : "text-zinc-400 hover:text-white hover:bg-white/10"}`}>
            <FileText size={18} /> Documents
          </Button>
        </Link>
        <Link href="/admin/applications">
          <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium transition-all duration-200 ${isActive("/admin/applications") ? "bg-primary text-white shadow-sm ring-1 ring-primary/50" : "text-zinc-400 hover:text-white hover:bg-white/10"}`}>
            <Briefcase size={18} /> Applications
          </Button>
        </Link>
        <Link href="/admin/subhaulers">
          <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium transition-all duration-200 ${isActive("/admin/subhaulers") ? "bg-primary text-white shadow-sm ring-1 ring-primary/50" : "text-zinc-400 hover:text-white hover:bg-white/10"}`}>
            <Truck size={18} /> Subhaulers
          </Button>
        </Link>
      </nav>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
        <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 mb-4 font-medium transition-colors"
            >
              <LogOut size={18} /> Logout
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out of the admin panel?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleLogout}>Logout</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <div className="flex items-center gap-3 px-2 pt-2 border-t border-zinc-800">
          <Avatar className="h-9 w-9 border border-zinc-700 shadow-sm">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-zinc-800 text-zinc-400">AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm overflow-hidden">
            <span className="font-bold text-white truncate">{user?.displayName || "Admin User"}</span>
            <span className="text-zinc-500 text-xs truncate" title={user?.email || ""}>{user?.email || "admin@49trucking.com"}</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <aside className="w-72 bg-zinc-900 border-r border-zinc-800 hidden md:flex flex-col sticky top-0 h-screen shadow-xl z-30">
      <NavContent />
    </aside>
  );
}

export function AdminMobileHeader() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const isActive = (path: string) => location === path;

  const handleLogout = async () => {
    setIsLogoutDialogOpen(false);
    await logout();
  };

  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <Logo iconSize="h-8" />
      </div>
      
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-zinc-900">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 bg-zinc-900 border-r border-zinc-800 text-white">
          <div className="flex flex-col h-full">
            <div className="p-6 mb-2">
              <div className="flex items-center gap-2">
                <Logo dark={true} stacked={true} iconSize="h-12" className="items-center text-center w-full" />
              </div>
            </div>
            
            <nav className="flex-1 px-3 space-y-1">
              <p className="px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 mt-2">Menu</p>
              <Link href="/admin">
                <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium ${isActive("/admin") ? "bg-primary text-white shadow-sm ring-1 ring-primary/50" : "text-zinc-400 hover:text-white hover:bg-white/10"}`} onClick={() => setOpen(false)}>
                  <LayoutDashboard size={18} /> Overview
                </Button>
              </Link>
              <Link href="/admin/trucks">
                <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium ${isActive("/admin/trucks") ? "bg-primary text-white shadow-sm ring-1 ring-primary/50" : "text-zinc-400 hover:text-white hover:bg-white/10"}`} onClick={() => setOpen(false)}>
                  <Truck size={18} /> Trucks
                </Button>
              </Link>
              <Link href="/admin/trips">
                <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium ${isActive("/admin/trips") ? "bg-primary text-white shadow-sm ring-1 ring-primary/50" : "text-zinc-400 hover:text-white hover:bg-white/10"}`} onClick={() => setOpen(false)}>
                  <Package size={18} /> Trips & Loads
                </Button>
              </Link>
              <Link href="/admin/drivers">
                <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium ${isActive("/admin/drivers") ? "bg-primary text-white shadow-sm ring-1 ring-primary/50" : "text-zinc-400 hover:text-white hover:bg-white/10"}`} onClick={() => setOpen(false)}>
                  <Users size={18} /> Drivers
                </Button>
              </Link>
              <Link href="/admin/documents">
                <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium ${isActive("/admin/documents") ? "bg-primary text-white shadow-sm ring-1 ring-primary/50" : "text-zinc-400 hover:text-white hover:bg-white/10"}`} onClick={() => setOpen(false)}>
                  <FileText size={18} /> Documents
                </Button>
              </Link>
              <Link href="/admin/applications">
                <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium ${isActive("/admin/applications") ? "bg-primary text-white shadow-sm ring-1 ring-primary/50" : "text-zinc-400 hover:text-white hover:bg-white/10"}`} onClick={() => setOpen(false)}>
                  <Briefcase size={18} /> Applications
                </Button>
              </Link>
              <Link href="/admin/subhaulers">
                <Button variant="ghost" className={`w-full justify-start gap-3 mb-1 font-medium ${isActive("/admin/subhaulers") ? "bg-primary text-white shadow-sm ring-1 ring-primary/50" : "text-zinc-400 hover:text-white hover:bg-white/10"}`} onClick={() => setOpen(false)}>
                  <Truck size={18} /> Subhaulers
                </Button>
              </Link>
            </nav>

            <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
              <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-3 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 mb-4 font-medium"
                  >
                    <LogOut size={18} /> Logout
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Logout</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to log out of the admin panel?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)}>Cancel</Button>
                    <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <div className="flex items-center gap-3 px-2 pt-2 border-t border-zinc-800">
                <Avatar className="h-8 w-8 border border-zinc-700">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-zinc-800 text-zinc-400">AD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm overflow-hidden">
                  <span className="font-semibold text-white truncate">{user?.displayName || "Admin User"}</span>
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
