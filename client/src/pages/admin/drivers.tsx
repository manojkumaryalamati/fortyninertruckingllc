import { useState } from "react";
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
  Search, 
  Plus, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Mock Drivers Data
const initialDrivers = [
  { id: "DRV-001", name: "Michael Rodriguez", status: "Active", phone: "(555) 123-4567", email: "m.rodriguez@49trucking.com", license: "CDL-A 829102", truck: "T-680 #409", joinDate: "Jan 12, 2022" },
  { id: "DRV-002", name: "Sarah Jenkins", status: "Active", phone: "(555) 987-6543", email: "s.jenkins@49trucking.com", license: "CDL-A 192834", truck: "T-680 #410", joinDate: "Mar 04, 2023" },
  { id: "DRV-003", name: "David Chen", status: "On Leave", phone: "(555) 456-7890", email: "d.chen@49trucking.com", license: "CDL-A 564738", truck: "Unassigned", joinDate: "Nov 15, 2021" },
  { id: "DRV-004", name: "Robert Johnson", status: "Active", phone: "(555) 234-5678", email: "r.johnson@49trucking.com", license: "CDL-A 918273", truck: "P-389 #205", joinDate: "Jun 20, 2020" },
  { id: "DRV-005", name: "Emily Davis", status: "Suspended", phone: "(555) 876-5432", email: "e.davis@49trucking.com", license: "CDL-A 736451", truck: "Unassigned", joinDate: "Aug 10, 2023" },
];

export default function DriversManagement() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [drivers, setDrivers] = useState(initialDrivers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredDrivers = drivers.filter(driver => 
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    driver.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDriver = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newDriver = {
      id: `DRV-00${drivers.length + 1}`,
      name: formData.get("name") as string,
      status: "Active",
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      license: formData.get("license") as string,
      truck: "Unassigned",
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };
    setDrivers([...drivers, newDriver]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col sticky top-0 h-screen">
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-[1600px] mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Drivers</h1>
            <p className="text-muted-foreground">Manage driver profiles, assignments, and compliance.</p>
          </div>
          <div className="flex gap-3">
             <Link href="/admin">
               <Button variant="outline">Back to Dashboard</Button>
             </Link>
             
             <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
               <DialogTrigger asChild>
                 <Button className="gap-2"><Plus size={16} /> Add Driver</Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[600px]">
                 <DialogHeader>
                   <DialogTitle>Add New Driver</DialogTitle>
                 </DialogHeader>
                 <form onSubmit={handleAddDriver} className="space-y-6 py-4">
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label htmlFor="name">Full Name</Label>
                       <Input id="name" name="name" placeholder="John Doe" required />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="phone">Phone Number</Label>
                       <Input id="phone" name="phone" placeholder="(555) 000-0000" required />
                     </div>
                   </div>
                   
                   <div className="space-y-2">
                     <Label htmlFor="email">Email Address</Label>
                     <Input id="email" name="email" type="email" placeholder="john@49trucking.com" required />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label htmlFor="license">CDL Number</Label>
                       <Input id="license" name="license" placeholder="CDL-A 123456" required />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="status">Initial Status</Label>
                       <Select name="status" defaultValue="Active">
                         <SelectTrigger>
                           <SelectValue placeholder="Select status" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="Active">Active</SelectItem>
                           <SelectItem value="On Leave">On Leave</SelectItem>
                           <SelectItem value="Suspended">Suspended</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                   </div>

                   <div className="space-y-2">
                     <Label>Upload Documents</Label>
                     <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:bg-secondary/50 transition-colors cursor-pointer">
                       <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                       <p className="text-sm font-medium">Click to upload CDL or Medical Card</p>
                       <p className="text-xs text-muted-foreground">PDF, JPG up to 10MB</p>
                     </div>
                   </div>

                   <DialogFooter>
                     <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                     <Button type="submit">Create Profile</Button>
                   </DialogFooter>
                 </form>
               </DialogContent>
             </Dialog>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search by name or ID..." 
              className="pl-9 bg-background border-border" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Active</Button>
            <Button variant="outline" size="sm">On Leave</Button>
            <Button variant="outline" size="sm">Suspended</Button>
          </div>
        </div>

        {/* Drivers Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDrivers.map(driver => (
            <Card key={driver.id} className="shadow-sm hover:shadow-md transition-shadow group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">{driver.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base font-bold">{driver.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{driver.id}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal size={16} />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase">Status</p>
                    <Badge variant="outline" className={`
                      ${driver.status === "Active" ? "bg-green-50 text-green-700 border-green-200" : 
                        driver.status === "On Leave" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : 
                        "bg-red-50 text-red-700 border-red-200"}
                    `}>
                      {driver.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase">Assigned Truck</p>
                    <div className="flex items-center gap-1 font-medium">
                      <Truck size={14} className="text-muted-foreground" />
                      {driver.truck}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <Phone size={14} /> {driver.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <Mail size={14} /> {driver.email}
                  </div>
                   <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <FileText size={14} /> {driver.license}
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                   <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
                   <Button variant="secondary" size="sm" className="flex-1">Documents</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      </main>
    </div>
  );
}
